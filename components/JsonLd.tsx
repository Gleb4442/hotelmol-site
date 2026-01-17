"use client";

import type { BlogPost, authors } from '@/shared/schema';
import Script from 'next/script';

type Author = typeof authors.$inferSelect;
type PostWithAuthor = BlogPost & { author: Author | null };

type LocalizedPost = {
  title: string;
  content: string;
  seoTitle: string;
  seoDescription?: string | null;
};

type JsonLdProps = {
  post: PostWithAuthor;
  localizedPost: LocalizedPost;
};

const JsonLd = ({ post, localizedPost }: JsonLdProps) => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hotelmol.com/blog/${post.slug}`,
    },
    headline: localizedPost.seoTitle || localizedPost.title,
    description: localizedPost.seoDescription || '',
    image: post.featuredImage || 'https://hotelmol.com/assets/hotelmol-logo.png',
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Hotelmol Team',
      image: post.author?.photo_url,
      sameAs: [
        "https://linkedin.com/company/hotelmol",
        "https://twitter.com/hotelmol"
      ]
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".prose p"]
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hotelmol',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hotelmol.com/assets/hotelmol-logo.png',
      },
      sameAs: [
        "https://linkedin.com/company/hotelmol",
        "https://twitter.com/hotelmol"
      ]
    },
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema, null, 2) }}
    />
  );
};

export default JsonLd;
