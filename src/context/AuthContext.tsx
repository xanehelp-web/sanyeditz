import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  loginError: string | null;
  isLoggingIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  clearLoginError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setProfile(userDoc.data() as UserProfile);
          } else {
            // Create new user profile
            const isDefaultAdmin = user.email === 'riponkhen9@gmail.com';
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email!,
              displayName: user.displayName,
              photoURL: user.photoURL,
              role: isDefaultAdmin ? 'admin' : 'user',
            };
            await setDoc(userDocRef, {
              ...newProfile,
              createdAt: serverTimestamp(),
            });
            setProfile(newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    console.log('Login attempt started...');
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('Login successful!');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/popup-closed-by-user') {
          console.log('Login popup closed by user');
          return;
        }
        if (error.code === 'auth/cancelled-popup-request') {
          console.log('Login request cancelled (multiple attempts)');
          return;
        }
        if (error.code === 'auth/unauthorized-domain') {
          setLoginError('Domain not authorized. Add this domain to Firebase console.');
          return;
        }
        if (error.code === 'auth/operation-not-supported-in-this-environment') {
          setLoginError('Login not supported in this view. Please open in a new tab.');
          return;
        }
        setLoginError(error.message);
      } else {
        setLoginError('An unexpected error occurred during login.');
      }
      console.error('Login Error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const clearLoginError = () => setLoginError(null);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const isAdmin = user?.email === 'riponkhen9@gmail.com';

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, loginError, isLoggingIn, login, logout, clearLoginError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
