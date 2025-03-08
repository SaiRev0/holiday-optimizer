'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { PageContent, PageDescription, PageHeader, PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, CalendarDays, ChevronUp, Clock, Info, Search, Sparkles } from 'lucide-react';
import { PROJECT_NAME } from '@/constants';
import Script from 'next/script';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const metadata: Metadata = {
  title: `Blog | Time Off Planning Resources | ${PROJECT_NAME}`,
  description: 'Helpful guides and resources on maximizing PTO, work-life balance, and strategic time off planning to get the most from your personal time.',
  openGraph: {
    title: `Blog | Time Off Planning Resources | ${PROJECT_NAME}`,
    description: 'Helpful guides and resources on maximizing PTO, work-life balance, and strategic time off planning to get the most from your personal time.',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
        width: 1200,
        height: 630,
        alt: 'Person enjoying work-life balance with laptop on beach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | Time Off Planning Resources | ${PROJECT_NAME}`,
    description: 'Helpful guides and resources on maximizing PTO, work-life balance, and strategic time off planning.',
    images: ['https://images.unsplash.com/photo-1506784983877-45594efa4cbe'],
  },
  alternates: {
    canonical: 'https://ctoplanner.com/blog',
  },
};

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  isoDate: string;
  featured?: boolean;
  imageUrl: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    title: 'How to Maximize Your PTO Days in 2024',
    description: 'Strategic planning techniques to get the most out of your limited paid time off by combining it with holidays and weekends.',
    slug: 'maximize-pto-days-2024',
    date: 'March 15, 2024',
    readTime: '8 min read',
    isoDate: '2024-03-15T00:00:00Z',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    tags: ['PTO Optimization', 'Strategic Planning'],
  },
  {
    title: 'The Ultimate Guide to Work-Life Balance',
    description: 'Discover practical strategies for achieving better work-life balance through effective time-off planning and boundary setting.',
    slug: 'ultimate-guide-work-life-balance',
    date: 'March 10, 2024',
    readTime: '10 min read',
    isoDate: '2024-03-10T00:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    tags: ['Work-Life Balance', 'Wellness'],
  },
  {
    title: 'Strategic Planning for Long Weekends',
    description: 'Learn how to strategically plan your time off around holidays and weekends to maximize your breaks without using too many PTO days.',
    slug: 'strategic-planning-long-weekends',
    date: 'March 15, 2024',
    readTime: '8 min read',
    isoDate: '2024-03-15T00:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=800&q=80',
    tags: ['Long Weekends', 'PTO Optimization', 'Holiday Planning'],
  },
  {
    title: 'How to Coordinate Team Time Off Effectively',
    description: 'Best practices for managing team time off to maintain productivity while ensuring everyone gets needed breaks.',
    slug: 'coordinate-team-time-off-effectively',
    date: 'March 1, 2024',
    readTime: '9 min read',
    isoDate: '2024-03-01T00:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    tags: ['Team Management', 'Productivity'],
  },
  {
    title: 'Understanding Public Holidays Around the World',
    description: 'A comprehensive guide to global holidays and how to leverage them for better time off planning.',
    slug: 'understanding-public-holidays-around-world',
    date: 'February 25, 2024',
    readTime: '12 min read',
    isoDate: '2024-02-25T00:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1535475661942-d38866cf0406?auto=format&fit=crop&w=800&q=80',
    tags: ['Global Holidays', 'International'],
  },
];

const BlogCard = ({ post, priority = false }: { post: BlogPost, priority?: boolean }) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-3">
            {post.description}
          </p>
          
          <div className="mt-auto">
            {/* Date and read time */}
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                {post.date}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// AI Content Indicator - subtle tooltip approach
const AIContentIndicator = () => (
  <div className="text-center mb-8">
    <div className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 py-1.5 px-3 rounded-full bg-gray-50 dark:bg-gray-800/50">
      <Sparkles className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
      <span>AI-assisted content</span>
      <div className="group relative inline-block">
        <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
          <Info className="h-3.5 w-3.5" />
        </button>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all bg-white dark:bg-gray-800 text-xs rounded p-2 shadow-lg border border-gray-200 dark:border-gray-700 pointer-events-none z-10">
          Articles on this blog are generated with AI assistance. While we strive for accuracy, please verify any important information independently.
        </div>
      </div>
    </div>
  </div>
);

const FeaturedArticle = ({ featuredPost }: { featuredPost: BlogPost }) => (
  <div className="mb-16">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center">
        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
        Featured
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Article</h2>
    </div>
    <Link href={`/blog/${featuredPost.slug}`} className="group block">
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-950">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Image - takes up 3/5 of the container on medium screens and up */}
          <div className="relative aspect-[16/9] md:aspect-auto md:col-span-3 overflow-hidden">
            <img
              src={featuredPost.imageUrl}
              alt={featuredPost.title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Content - takes up 2/5 of the container on medium screens and up */}
          <div className="p-6 md:p-8 flex flex-col justify-between md:col-span-2">
            <div>
              {/* Tags */}
              {featuredPost.tags && featuredPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {featuredPost.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {featuredPost.description}
              </p>
            </div>
            
            <div className="mt-4">
              {/* Date and read time */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {featuredPost.date}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredPost.readTime}
                </span>
              </div>

              {/* Read more link */}
              <div className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-1.5 transition-all">
                Read article
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const FilterSection = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedTag, 
  setSelectedTag,
  allTags
}: { 
  searchQuery: string, 
  setSearchQuery: (query: string) => void, 
  selectedTag: string | null, 
  setSelectedTag: (tag: string | null) => void,
  allTags: string[]
}) => (
  <div className="mb-12 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Tag Filter */}
      <div className="flex-1">
        <div className="relative">
          <select
            value={selectedTag || ''}
            onChange={(e) => setSelectedTag(e.target.value || null)}
            className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Topics</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>
    </div>
    
    {/* Active filter indicators */}
    {(searchQuery || selectedTag) && (
      <div className="flex items-center gap-2 mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">Filtering by:</span>
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Search: {searchQuery}
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-1 hover:text-blue-600 dark:hover:text-blue-400"
              >
                ×
              </button>
            </span>
          )}
          {selectedTag && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Topic: {selectedTag}
              <button 
                onClick={() => setSelectedTag(null)}
                className="ml-1 hover:text-blue-600 dark:hover:text-blue-400"
              >
                ×
              </button>
            </span>
          )}
        </div>
        {(searchQuery || selectedTag) && (
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline ml-auto"
          >
            Reset all
          </button>
        )}
      </div>
    )}
  </div>
);

const ArticlesList = ({ posts, isFiltered = false }: { posts: BlogPost[], isFiltered?: boolean }) => (
  <div>
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex-shrink-0">
        {isFiltered ? (
          `${posts.length} ${posts.length === 1 ? 'article' : 'articles'} found`
        ) : (
          'Latest Articles'
        )}
      </h2>
      <div className="h-px flex-grow bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent"></div>
    </div>
    
    {posts.length === 0 ? (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post, index) => (
          <BlogCard key={post.slug} post={post} priority={index < 3} />
        ))}
      </div>
    )}
  </div>
);

const CTASection = () => (
  <div className="my-20 rounded-xl overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
    
    <div className="relative p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
        Subscribe to our newsletter
      </h2>
      <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
        Get the latest articles, tools, and resources straight to your inbox.
        No spam, just valuable content to help you optimize your work-life balance.
      </p>
      <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-4 py-3 rounded-lg border border-blue-400/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20"
        />
        <button
          type="button"
          className="px-6 py-3 bg-white hover:bg-blue-50 text-blue-700 font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Subscribe
        </button>
      </div>
      <p className="text-blue-200 text-sm mt-4">Join over 5,000 subscribers who are mastering work-life balance</p>
    </div>
  </div>
);

const BackToTopButton = ({ show, onClick }: { show: boolean, onClick: () => void }) => (
  <AnimatePresence>
    {show && (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClick}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 z-40"
        aria-label="Back to top"
      >
        <ChevronUp className="h-5 w-5" />
      </motion.button>
    )}
  </AnimatePresence>
);

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pageTopRef = useRef<HTMLDivElement>(null);

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesTag && matchesSearch;
  });

  // Remove featured post from regular posts listing if it's included in filtered results
  const regularPosts = filteredPosts.filter(post => post.slug !== featuredPost.slug);

  // Get all unique tags from blog posts
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Handle scroll to show back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if user is filtering by search query or tag
  const isFiltering = searchQuery !== '' || selectedTag !== null;

  // Schema data for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': `Blog | Time Off Planning Resources | ${PROJECT_NAME}`,
    'description': 'Helpful guides and resources on maximizing PTO, work-life balance, and strategic time off planning.',
    'url': 'https://ctoplanner.com/blog',
    'publisher': {
      '@type': 'Organization',
      'name': PROJECT_NAME,
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://ctoplanner.com/logo.png',
      }
    },
    'blogPost': blogPosts.map(post => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.description,
      'datePublished': post.isoDate,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `https://ctoplanner.com/blog/${post.slug}`,
      },
      'image': post.imageUrl,
    })),
  };

  return (
    <div ref={pageTopRef} className="min-h-screen flex flex-col">
      {/* SEO Schema */}
      <Script
        id="blog-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white mb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Holiday Planner Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Resources, guides, and strategies to help you maximize your time off and achieve better work-life balance.
            </p>
            <div className="flex justify-center">
              <Link 
                href="/"
                className="bg-white text-blue-600 hover:text-blue-700 font-medium rounded-lg px-6 py-3 shadow-md hover:shadow-lg transition-all"
              >
                Try Our Holiday Planner Tool
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 flex-grow">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">Blog</span>
        </div>

        {/* Filter Section */}
        <FilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={allTags}
        />

        <div className="mb-16">
          {/* Featured Article (only shown when not filtering) */}
          {!isFiltering && <FeaturedArticle featuredPost={featuredPost} />}
          
          {/* Articles List */}
          <ArticlesList posts={isFiltering ? filteredPosts : regularPosts} isFiltered={isFiltering} />
        </div>

        {/* Newsletter CTA */}
        <CTASection />
      </div>

      {/* Back to Top Button */}
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </div>
  );
} 