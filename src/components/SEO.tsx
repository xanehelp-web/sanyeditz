import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Sany Editz | Professional Designer & Visual Artist",
  description = "Sany is a professional designer specializing in Logo Design, UI/UX, and High-Conversion Thumbnails. Elevate your brand with futuristic and premium visual solutions.",
  keywords = "Sany, Sany Editz, Graphic Designer, Logo Design, UI/UX Design, YouTube Thumbnails, Freelance Designer, Branding Expert",
  image = "https://picsum.photos/seed/sany-portfolio/1200/630",
  url = "https://sany-portfolio.com",
  type = "website"
}) => {
  const siteTitle = title.includes("Sany") ? title : `${title} | Sany Editz`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
