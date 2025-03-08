'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  ArrowLeft,
  ArrowUp,
  Calendar,
  CheckCheck,
  Clock,
  Copy,
  Facebook,
  Info,
  Linkedin,
  Sparkles,
  Twitter,
} from 'lucide-react';
import { PageContent, PageHeader } from '@/components/layout/PageLayout';
import { TableOfContents } from '@/components/blog/TableOfContents';
import Script from 'next/script';
import { PROJECT_NAME } from '@/constants';

// AI Content Indicator - more subtle than a full banner
const AIContentIndicator = () => (
  <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-6">
    <Sparkles className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
    <span>AI-assisted content</span>
    <div className="group relative inline-block">
      <button
        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
        <Info className="h-3.5 w-3.5" />
      </button>
      <div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all bg-white dark:bg-gray-800 text-xs rounded p-2 shadow-lg border border-gray-200 dark:border-gray-700 pointer-events-none z-10">
        This content is generated with AI assistance. While we strive for accuracy, please verify any important
        information independently.
      </div>
    </div>
  </div>
);

interface BlogPostLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  date: string;
  readTime: string;
  publishedDate?: string; // ISO format date for schema
  author?: string;
  authorRole?: string;
  authorImageUrl?: string;
  tags?: string[];
  featuredImage?: string;
}

export const BlogPostLayout = ({
                                 children,
                                 title,
                                 description,
                                 date,
                                 readTime,
                                 publishedDate,
                                 author = 'Waqar Bin Kalim',
                                 authorRole = 'Developer & Time Management Enthusiast',
                                 authorImageUrl = '/images/team/default-avatar.png',
                                 tags = [],
                                 featuredImage,
                               }: BlogPostLayoutProps) => {
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const { theme } = useTheme();
  const articleRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const shareButtonRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // For schema data
  const canonicalUrl = `https://ctoplanner.com/blog/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

  // Calculate reading progress as user scrolls
  useEffect(() => {
    const updateReadingProgress = () => {
      if (!articleRef.current) return;

      const articleElement = articleRef.current;
      const totalHeight = articleElement.clientHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Adjust for the article's position from the top
      const articleTop = articleElement.getBoundingClientRect().top + window.scrollY;

      // Calculate how far we've scrolled into the article
      const scrolledIntoArticle = scrollY - articleTop;

      // Calculate reading progress
      const progress = Math.max(0, Math.min(100, (scrolledIntoArticle / (totalHeight - windowHeight)) * 100));

      setReadingProgress(progress);

      // Show back to top button after 25% scroll
      setShowBackToTop(scrollY > window.innerHeight * 0.25);
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  // Share functionality
  const handleShareClick = async (platform: string) => {
    const text = `Check out this article: ${title}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(canonicalUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(canonicalUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy URL: ', err);
        }
        break;
      default:
        break;
    }
  };

  // Schema data for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: featuredImage ? `https://ctoplanner.com${featuredImage}` : undefined,
    datePublished: publishedDate || new Date().toISOString(),
    dateModified: publishedDate || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: author,
      jobTitle: authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: PROJECT_NAME,
      logo: {
        '@type': 'ImageObject',
        url: 'https://ctoplanner.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Script
        id="blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-200 dark:bg-blue-900 z-50 origin-left"
        ref={progressBarRef}
        style={{ transform: `scaleX(${readingProgress / 100})` }}
      >
        <div className="h-full bg-blue-600 dark:bg-blue-400" />
      </div>

      {/* Feather-style Blog Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="flex flex-col space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all articles
            </Link>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {description}
            </p>

            {/* Author and Date */}
            <div className="flex items-start space-x-4 pt-2">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                <img
                  src={authorImageUrl}
                  alt={author}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900 dark:text-white">{author}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{authorRole}</span>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {featuredImage && (
              <div className="mt-6 rounded-lg overflow-hidden">
                <img
                  src={featuredImage}
                  alt={title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Table of Contents */}
          <div className="lg:w-64 order-2 lg:order-1">
            <div className="sticky top-24">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Table of Contents</h3>
                <TableOfContents />
              </div>

              {/* Social Share */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Share this post</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleShareClick('twitter')}
                    className="p-2 bg-[#1DA1F2] text-white rounded-md hover:bg-opacity-90"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShareClick('facebook')}
                    className="p-2 bg-[#1877F2] text-white rounded-md hover:bg-opacity-90"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShareClick('linkedin')}
                    className="p-2 bg-[#0A66C2] text-white rounded-md hover:bg-opacity-90"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShareClick('copy')}
                    className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-opacity-90 relative"
                    aria-label="Copy link"
                  >
                    {copied ? <CheckCheck className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    {copied && (
                      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        Link copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <article
            ref={articleRef}
            className="flex-1 order-1 lg:order-2 max-w-3xl prose prose-blue dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg"
          >
            {/* AI-assisted content indicator */}
            <AIContentIndicator />

            {/* Article Content */}
            {children}

            {/* Newsletter Sign-up - Feather style */}
            <div className="not-prose mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Subscribe to our newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get the latest articles, tools, and resources straight to your inbox.
                No spam, unsubscribe anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Back to top button */}
      <button
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-opacity ${
          showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}; 