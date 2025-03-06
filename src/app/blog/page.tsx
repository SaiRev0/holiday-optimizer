'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { PageContent, PageDescription, PageHeader, PageLayout } from '@/components/layout/PageLayout';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, CalendarDays, Clock, Search, Tag } from 'lucide-react';
import { PROJECT_NAME } from '@/constants';
import Script from 'next/script';
import { cn } from '@/lib/utils';

const metadata: Metadata = {
  title: `Blog | Time Off Planning Resources | ${PROJECT_NAME}`,
  description: 'Helpful guides and resources on maximizing PTO, work-life balance, and strategic time off planning to get the most from your compensatory time off.',
  openGraph: {
    title: `Blog | Time Off Planning Resources | ${PROJECT_NAME}`,
    description: 'Helpful guides and resources on maximizing PTO, work-life balance, and strategic time off planning to get the most from your compensatory time off.',
    type: 'website',
    images: [
      {
        url: 'https://ctoplanner.com/images/blog/blog-index-og.jpg',
        width: 1200,
        height: 630,
        alt: 'CTO Planner Blog - Time Off Planning Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | Time Off Planning Resources | ${PROJECT_NAME}`,
    description: 'Helpful guides and resources on maximizing PTO, work-life balance, and strategic time off planning.',
    images: ['https://ctoplanner.com/images/blog/blog-index-og.jpg'],
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
  imageUrl?: string;
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
    imageUrl: '/images/blog/maximize-pto-days-2024.jpg',
    tags: ['PTO Optimization', 'Strategic Planning'],
  },
  {
    title: 'The Ultimate Guide to Work-Life Balance',
    description: 'Discover practical strategies for achieving better work-life balance through effective time-off planning and boundary setting.',
    slug: 'ultimate-guide-work-life-balance',
    date: 'March 10, 2024',
    readTime: '10 min read',
    isoDate: '2024-03-10T00:00:00Z',
    imageUrl: '/images/blog/work-life-balance.jpg',
    tags: ['Work-Life Balance', 'Wellness'],
  },
  {
    title: 'Strategic Planning for Long Weekends',
    description: 'Learn how to strategically plan your time off around holidays and weekends to maximize your breaks without using too many PTO days.',
    slug: 'strategic-planning-long-weekends',
    date: 'March 15, 2024',
    readTime: '8 min read',
    isoDate: '2024-03-15T00:00:00Z',
    imageUrl: '/images/blog/long-weekends.jpg',
    tags: ['Long Weekends', 'PTO Optimization', 'Holiday Planning'],
  },
  {
    title: 'How to Coordinate Team Time Off Effectively',
    description: 'Best practices for managing team time off to maintain productivity while ensuring everyone gets needed breaks.',
    slug: 'coordinate-team-time-off-effectively',
    date: 'March 1, 2024',
    readTime: '9 min read',
    isoDate: '2024-03-01T00:00:00Z',
    imageUrl: '/images/blog/team-coordination.jpg',
    tags: ['Team Management', 'Productivity'],
  },
  {
    title: 'Understanding Public Holidays Around the World',
    description: 'A comprehensive guide to global holidays and how to leverage them for better time off planning.',
    slug: 'understanding-public-holidays-around-world',
    date: 'February 25, 2024',
    readTime: '12 min read',
    isoDate: '2024-02-25T00:00:00Z',
    imageUrl: '/images/blog/global-holidays.jpg',
    tags: ['Global Holidays', 'International'],
  },
];

// Extract all unique tags
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Featured post is the one with featured: true or the first post
  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];
  
  // Filter posts based on selected tag and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    const matchesSearch = searchQuery 
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    return matchesTag && matchesSearch;
  });
  
  // Remove featured post from main list if it's being displayed as featured
  const regularPosts = filteredPosts.filter(post => post.slug !== featuredPost.slug);
  
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://ctoplanner.com/blog/${post.slug}`,
        name: post.title,
        description: post.description,
        datePublished: post.isoDate
      }))
    },
    name: 'Time Off Planning Resources',
    description: 'Helpful guides and resources to help you optimize your time off, improve work-life balance, and make the most of your compensatory days.'
  };

  return (
    <PageLayout>
      <Script
        id="blog-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        strategy="afterInteractive"
      />
      
      <PageHeader className="py-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Time Off Planning <span className="text-blue-600 dark:text-blue-400">Resources</span>
          </h1>
          <PageDescription className="mt-4 text-xl">
            Helpful guides and resources to help you optimize your time off, improve work-life balance, 
            and make the most of your compensatory days.
          </PageDescription>
          
          {/* Search and Filter UI */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  selectedTag === null
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                All Topics
              </button>
              
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    selectedTag === tag
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PageHeader>
      
      <PageContent>
        {/* Featured Post */}
        {selectedTag === null && searchQuery === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
              Featured Article
            </h2>
            <Link 
              href={`/blog/${featuredPost.slug}`} 
              className="block"
            >
              <div className="group overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
                <div className="sm:flex">
                  <div className="sm:w-2/5 h-60 sm:h-auto overflow-hidden relative">
                    {featuredPost.imageUrl ? (
                      <img 
                        src={featuredPost.imageUrl} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500" />
                    )}
                  </div>
                  <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        {featuredPost.tags.map(tag => (
                          <span key={tag} className="mr-2 text-xs px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                        {featuredPost.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarDays className="mr-1 h-4 w-4" />
                        <span className="mr-4">{featuredPost.date}</span>
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                        Read article
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
        
        {/* All Posts or Filtered Posts */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold flex items-center">
              {selectedTag ? (
                <>
                  <Tag className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  {selectedTag}
                </>
              ) : searchQuery ? (
                <>
                  <Search className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Search Results
                </>
              ) : (
                <>
                  <BookOpen className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  All Articles
                </>
              )}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => { setSelectedTag(null); setSearchQuery(''); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View all articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedTag || searchQuery ? filteredPosts : regularPosts).map((post) => (
                <Link 
                  href={`/blog/${post.slug}`} 
                  key={post.slug}
                  className="group"
                >
                  <Card className="h-full overflow-hidden bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all duration-200">
                    {post.imageUrl && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <CardTitle className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-3 mt-2">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0 flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarDays className="mr-1 h-3.5 w-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center transition-all group-hover:translate-x-1">
                        Read article
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to optimize your time off?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Use my free tool to plan your PTO days strategically and maximize your time off 
            without sacrificing productivity.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all transform hover:scale-105"
          >
            Try CTO Days Optimizer
          </Link>
        </div>
      </PageContent>
    </PageLayout>
  );
} 