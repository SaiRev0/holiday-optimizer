'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter, Linkedin, Copy, CheckCheck, ArrowUp } from 'lucide-react';
import { PageContent, PageHeader } from '@/components/layout/PageLayout';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { PROJECT_NAME } from '@/constants';

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
  author = 'Waqar Kalim',
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
      
      <PageHeader className="py-6 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto max-w-4xl px-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all articles
          </Link>
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
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
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {description}
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{readTime}</span>
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
      </PageHeader>
      
      <PageContent>
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4">
          {/* Left Sidebar */}
          <div className="lg:w-64 order-2 lg:order-1">
            <div className="sticky top-24">
              {/* Table of Contents */}
              <div className="mb-8">
                <TableOfContents contentId="blog-content" />
              </div>
              
              {/* Share buttons */}
              <div ref={shareButtonRef} className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Share this article</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleShareClick('facebook')}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShareClick('twitter')}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShareClick('linkedin')}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleShareClick('copy')}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    aria-label="Copy link"
                  >
                    {copied ? <CheckCheck className="h-5 w-5 text-green-600 dark:text-green-500" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <main className="flex-1 max-w-3xl order-1 lg:order-2">
            <article id="blog-content" ref={articleRef} className="prose prose-slate prose-headings:scroll-mt-24 dark:prose-invert lg:prose-lg max-w-none">
              {children}
            </article>
            
            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <img
                  src={authorImageUrl}
                  alt={author}
                  className="rounded-full w-16 h-16 object-cover border-2 border-gray-100 dark:border-gray-800"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{author}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{authorRole}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                I'm passionate about helping professionals optimize their work-life balance through strategic planning and efficient use of time off. This tool was built to share what I've learned about maximizing time away from work.
              </p>
            </div>
            
            {/* Related Articles */}
            <div className="mt-16">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">More Resources</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Link 
                  href="/blog/maximize-pto-days-2024" 
                  className="group p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  tabIndex={0}
                  aria-label="Read article about maximizing PTO days"
                >
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    How to Maximize Your PTO Days in 2024
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Strategic planning techniques to get the most out of your limited paid time off.
                  </p>
                </Link>
                <Link 
                  href="/blog/strategic-planning-long-weekends" 
                  className="group p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  tabIndex={0}
                  aria-label="Read article about strategic planning for long weekends"
                >
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Strategic Planning for Long Weekends
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Learn how to plan your time off around holidays and weekends to maximize breaks.
                  </p>
                </Link>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 text-center shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Ready to optimize your time off?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Use my free tool to plan your PTO days strategically and maximize your time off 
                without sacrificing productivity.
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all"
              >
                Try CTO Days Optimizer
              </Link>
            </div>
          </main>
          
          {/* Right Sidebar - for potential ads or additional navigation */}
          <div className="lg:w-64 order-3 hidden xl:block">
            <div className="sticky top-24">
              {/* Future expansion area */}
            </div>
          </div>
        </div>
      </PageContent>
      
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-opacity z-40"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}; 