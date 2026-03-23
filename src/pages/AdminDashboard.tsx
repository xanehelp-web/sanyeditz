import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { collection, query, orderBy, addDoc, deleteDoc, doc, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, storage } from '../lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, MessageSquare, Briefcase, Settings, LogOut, ArrowLeft, X, Edit2, ExternalLink, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_ITEMS, SERVICES } from '../constants';

export const AdminDashboard = () => {
  const { isAdmin, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'messages' | 'portfolio' | 'services'>('messages');
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);

  const [migrationAttempted, setMigrationAttempted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [messagesSnapshot] = useCollection(isAdmin ? query(collection(db, 'messages'), orderBy('createdAt', 'desc')) : null);
  const [portfolioSnapshot] = useCollection(isAdmin ? query(collection(db, 'portfolio'), orderBy('createdAt', 'desc')) : null);
  const [servicesSnapshot] = useCollection(isAdmin ? collection(db, 'services') : null);

  // Auto-migrate static data if collections are empty
  useEffect(() => {
    const migrateIfNeeded = async () => {
      if (!isAdmin || !portfolioSnapshot || !servicesSnapshot || migrationAttempted) return;

      const portfolioEmpty = portfolioSnapshot.empty;
      const servicesEmpty = servicesSnapshot.empty;

      if (portfolioEmpty || servicesEmpty) {
        setMigrationAttempted(true);
        console.log('Auto-migrating static data to Firestore...');
        const batch = writeBatch(db);

        if (portfolioEmpty) {
          PORTFOLIO_ITEMS.forEach((item) => {
            const { id, ...data } = item;
            const docRef = doc(collection(db, 'portfolio'));
            batch.set(docRef, { ...data, createdAt: serverTimestamp() });
          });
        }

        if (servicesEmpty) {
          SERVICES.forEach((service) => {
            const { id, tier, delivery, ...data } = service;
            const docRef = doc(collection(db, 'services'));
            batch.set(docRef, { 
              ...data, 
              icon: 'Settings',
              popular: tier === 'Standard',
              createdAt: serverTimestamp() 
            });
          });
        }

        try {
          await batch.commit();
          console.log('Auto-migration successful');
        } catch (error) {
          console.error('Auto-migration failed:', error);
        }
      }
    };

    migrateIfNeeded();
  }, [isAdmin, portfolioSnapshot, servicesSnapshot, migrationAttempted]);

  if (loading) return <div className="min-h-screen bg-dark flex items-center justify-center text-primary">Loading...</div>;
  if (!isAdmin) return <Navigate to="/" />;

  const messages = messagesSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
  const portfolio = portfolioSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];
  const services = servicesSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `portfolio/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('imageFile') as File;
    let imageUrl = formData.get('image') as string;

    try {
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
      }

      const projectData = {
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        image: imageUrl,
        description: formData.get('description') as string,
        tools: (formData.get('tools') as string).split(',').map(t => t.trim()),
        price: Number(formData.get('price')),
        sellable: formData.get('sellable') === 'on',
        featured: formData.get('featured') === 'on',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'portfolio'), projectData);
      setIsAddingProject(false);
    } catch (error) {
      console.error('Error adding project:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;
    setIsUploading(true);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get('imageFile') as File;
    let imageUrl = formData.get('image') as string;

    try {
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
      }

      const projectData = {
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        image: imageUrl,
        description: formData.get('description') as string,
        tools: (formData.get('tools') as string).split(',').map(t => t.trim()),
        price: Number(formData.get('price')),
        sellable: formData.get('sellable') === 'on',
        featured: formData.get('featured') === 'on',
      };

      await updateDoc(doc(db, 'portfolio', editingProject.id), projectData);
      setEditingProject(null);
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      icon: formData.get('icon') as string,
      features: (formData.get('features') as string).split(',').map(f => f.trim()),
      popular: formData.get('popular') === 'on',
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'services'), serviceData);
      setIsAddingService(false);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleUpdateService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingService) return;

    const formData = new FormData(e.currentTarget);
    const serviceData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      icon: formData.get('icon') as string,
      features: (formData.get('features') as string).split(',').map(f => f.trim()),
      popular: formData.get('popular') === 'on',
    };

    try {
      await updateDoc(doc(db, 'services', editingService.id), serviceData);
      setEditingService(null);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-foreground font-mono">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-border p-6 flex flex-col z-50">
        <div className="mb-12">
          <Link to="/" className="text-2xl font-display text-primary flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Admin
          </Link>
        </div>

        <nav className="flex-grow space-y-4">
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'messages' ? 'bg-primary text-dark font-bold' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <MessageSquare className="w-5 h-5" /> Messages
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'portfolio' ? 'bg-primary text-dark font-bold' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <Briefcase className="w-5 h-5" /> Portfolio
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${activeTab === 'services' ? 'bg-primary text-dark font-bold' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <Settings className="w-5 h-5" /> Services
          </button>
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-12">
        <header className="mb-12 flex justify-between items-center">
          <h1 className="text-4xl font-display text-primary uppercase tracking-widest">
            {activeTab === 'messages' ? 'Inbound Messages' : activeTab === 'portfolio' ? 'Manage Portfolio' : 'Manage Services'}
          </h1>
          {activeTab === 'portfolio' && (
            <button 
              onClick={() => setIsAddingProject(true)}
              className="minecraft-btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          )}
          {activeTab === 'services' && (
            <button 
              onClick={() => setIsAddingService(true)}
              className="minecraft-btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Service
            </button>
          )}
        </header>

        {activeTab === 'messages' && (
          <div className="space-y-6">
            {messages.length === 0 ? (
              <p className="text-slate-500 text-center py-20">No messages yet.</p>
            ) : (
              messages.map((msg: any) => (
                <div key={msg.id} className="bg-surface p-6 rounded-2xl border border-border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{msg.name}</h3>
                      <p className="text-primary text-xs">{msg.email}</p>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {msg.createdAt?.toDate().toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{msg.message}</p>
                  <button
                    onClick={() => deleteDoc(doc(db, 'messages', msg.id))}
                    className="mt-4 text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {portfolio.map((item: any) => (
              <div key={item.id} className="bg-surface rounded-2xl border border-border overflow-hidden group">
                <div className="aspect-video relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      onClick={() => setEditingProject(item)}
                      className="p-3 bg-primary text-dark rounded-full hover:bg-white transition-colors"
                      title="Edit Project"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteDoc(doc(db, 'portfolio', item.id))}
                      className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-primary text-[10px] uppercase tracking-widest mb-2 block">{item.category}</span>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service: any) => (
              <div key={service.id} className="bg-surface p-6 rounded-2xl border border-border relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingService(service)}
                      className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-dark transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteDoc(doc(db, 'services', service.id))}
                      className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                <div className="text-2xl font-display text-primary mb-4">{service.price}</div>
                <div className="space-y-2">
                  {service.features?.slice(0, 3).map((feature: string, i: number) => (
                    <div key={i} className="text-[10px] text-slate-500 flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <div className="col-span-full py-20 text-center bg-surface rounded-2xl border border-dashed border-border">
                <p className="text-slate-500">No services added yet. Fallback items are being used on the main site.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {isAddingProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingProject(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-dark border border-border rounded-3xl p-8 overflow-hidden"
            >
              <button
                onClick={() => setIsAddingProject(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-display text-primary mb-8">Add New Project</h2>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Title</label>
                    <input name="title" required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" placeholder="Project Title" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Category</label>
                    <select name="category" required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm">
                      <option>Logo Design</option>
                      <option>UI/UX</option>
                      <option>Thumbnails</option>
                      <option>Social Media</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Image URL</label>
                    <input name="image" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" placeholder="https://..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Or Upload Image</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        name="imageFile" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full bg-surface border border-dashed border-border rounded-xl px-4 py-3 text-sm flex items-center gap-2 text-slate-400 group-hover:border-primary group-hover:text-primary transition-all">
                        <Upload className="w-4 h-4" />
                        <span>Choose file...</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500">Description</label>
                  <textarea name="description" required rows={3} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm resize-none" placeholder="Project details..." />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500">Tools (comma separated)</label>
                  <input name="tools" required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" placeholder="Photoshop, Figma, etc." />
                </div>
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Price</label>
                    <input name="price" type="number" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" placeholder="0" />
                  </div>
                  <label className="flex items-center gap-2 p-3 bg-surface border border-border rounded-xl cursor-pointer">
                    <input name="sellable" type="checkbox" className="w-4 h-4 accent-primary" />
                    <span className="text-[10px] uppercase text-slate-400">Sellable</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-surface border border-border rounded-xl cursor-pointer">
                    <input name="featured" type="checkbox" className="w-4 h-4 accent-primary" />
                    <span className="text-[10px] uppercase text-slate-400">Featured</span>
                  </label>
                </div>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="w-full minecraft-btn-primary py-4 mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Create Project'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Edit Project Modal */}
        {editingProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-dark border border-border rounded-3xl p-8 overflow-hidden"
            >
              <button
                onClick={() => setEditingProject(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-display text-primary mb-8">Edit Project</h2>
              <form onSubmit={handleUpdateProject} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Title</label>
                    <input name="title" defaultValue={editingProject.title} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Category</label>
                    <select name="category" defaultValue={editingProject.category} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm">
                      <option>Logo Design</option>
                      <option>UI/UX</option>
                      <option>Thumbnails</option>
                      <option>Social Media</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Image URL</label>
                    <input name="image" defaultValue={editingProject.image} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Or Upload New Image</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        name="imageFile" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full bg-surface border border-dashed border-border rounded-xl px-4 py-3 text-sm flex items-center gap-2 text-slate-400 group-hover:border-primary group-hover:text-primary transition-all">
                        <Upload className="w-4 h-4" />
                        <span>Choose file...</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500">Description</label>
                  <textarea name="description" defaultValue={editingProject.description} required rows={3} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm resize-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500">Tools (comma separated)</label>
                  <input name="tools" defaultValue={editingProject.tools?.join(', ')} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" />
                </div>
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Price</label>
                    <input name="price" type="number" defaultValue={editingProject.price} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <label className="flex items-center gap-2 p-3 bg-surface border border-border rounded-xl cursor-pointer">
                    <input name="sellable" type="checkbox" defaultChecked={editingProject.sellable} className="w-4 h-4 accent-primary" />
                    <span className="text-[10px] uppercase text-slate-400">Sellable</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-surface border border-border rounded-xl cursor-pointer">
                    <input name="featured" type="checkbox" defaultChecked={editingProject.featured} className="w-4 h-4 accent-primary" />
                    <span className="text-[10px] uppercase text-slate-400">Featured</span>
                  </label>
                </div>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="w-full minecraft-btn-primary py-4 mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Project'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Add Service Modal */}
        {isAddingService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingService(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-dark border border-border rounded-3xl p-8 overflow-hidden"
            >
              <button
                onClick={() => setIsAddingService(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-display text-primary mb-8">Add New Service</h2>
              <form onSubmit={handleAddService} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Title</label>
                    <input name="title" required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" placeholder="Service Title" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Price</label>
                    <input name="price" required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" placeholder="e.g. $49.99" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500">Description</label>
                  <textarea name="description" required rows={3} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm resize-none" placeholder="Service details..." />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500">Features (comma separated)</label>
                  <input name="features" required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" placeholder="Feature 1, Feature 2, etc." />
                </div>
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Icon Name (Lucide)</label>
                    <input name="icon" required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" placeholder="Settings, Mail, etc." />
                  </div>
                  <label className="flex items-center gap-2 p-3 bg-surface border border-border rounded-xl cursor-pointer">
                    <input name="popular" type="checkbox" className="w-4 h-4 accent-primary" />
                    <span className="text-[10px] uppercase text-slate-400">Popular / Featured</span>
                  </label>
                </div>
                <button type="submit" className="w-full minecraft-btn-primary py-4 mt-4">
                  Create Service
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Edit Service Modal */}
        {editingService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-dark border border-border rounded-3xl p-8 overflow-hidden"
            >
              <button
                onClick={() => setEditingService(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-display text-primary mb-8">Edit Service</h2>
              <form onSubmit={handleUpdateService} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Title</label>
                    <input name="title" defaultValue={editingService.title} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Price</label>
                    <input name="price" defaultValue={editingService.price} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500">Description</label>
                  <textarea name="description" defaultValue={editingService.description} required rows={3} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm resize-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-slate-500">Features (comma separated)</label>
                  <input name="features" defaultValue={editingService.features?.join(', ')} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-500">Icon Name (Lucide)</label>
                    <input name="icon" defaultValue={editingService.icon} required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <label className="flex items-center gap-2 p-3 bg-surface border border-border rounded-xl cursor-pointer">
                    <input name="popular" type="checkbox" defaultChecked={editingService.popular} className="w-4 h-4 accent-primary" />
                    <span className="text-[10px] uppercase text-slate-400">Popular / Featured</span>
                  </label>
                </div>
                <button type="submit" className="w-full minecraft-btn-primary py-4 mt-4">
                  Update Service
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
