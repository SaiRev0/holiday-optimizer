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

// Extract all unique tags
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

// Blog card component for consistent card styling
const BlogCard = ({ post, priority = false }: { post: BlogPost, priority?: boolean }) => {
  return (
    <Card className={cn(
      'group h-full overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/30 transition-all duration-300',
      'hover:shadow-lg hover:-translate-y-1.5 hover:border-blue-200 dark:hover:border-blue-800/50',
      'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900',
      'rounded-xl',
    )}>
      <div className="relative overflow-hidden">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-t-xl">
          <img
            src={post.imageUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
            loading={priority ? "eager" : "lazy"}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
        </div>

        <div className="absolute bottom-0 inset-x-0 p-4">
          <div
            className="flex flex-wrap gap-2 justify-start items-center translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/95 text-gray-800 dark:bg-gray-800/95 dark:text-gray-100 shadow-sm backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <CardHeader className="px-5 pt-5 pb-0">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2.5">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <CardTitle
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 pt-3 pb-0">
        <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {post.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="px-5 pt-4 pb-5 mt-auto">
        <div
          className="text-sm font-medium flex items-center gap-1.5 relative overflow-hidden group-hover:gap-2.5 transition-all duration-300">
          <span className="text-blue-600 dark:text-blue-400 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600/20 dark:after:bg-blue-400/20 after:origin-right after:scale-x-0 group-hover:after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-300">Read article</span>
          <ArrowRight className="text-blue-600 dark:text-blue-400 h-4 w-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </CardFooter>
    </Card>
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
  <section aria-labelledby="featured-article-heading" className="mb-14">
    <div className="flex items-center justify-between mb-5">
      <h2 id="featured-article-heading" className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
        <Sparkles className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
        Featured Article
      </h2>
      <div className="h-[1px] flex-grow mx-4 bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-800"></div>
    </div>
    
    <Link
      href={`/blog/${featuredPost.slug}`}
      className="block group"
      aria-label={`Read featured article: ${featuredPost.title}`}
    >
      <BlogCard post={featuredPost} priority={true} />
    </Link>
  </section>
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
  <div className="mb-10 space-y-6">
    <div className="relative w-full max-w-lg mx-auto transform transition-all duration-200 hover:scale-[1.02] focus-within:scale-[1.02]">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search articles..."
        aria-label="Search articles"
        className="pl-12 pr-4 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all shadow-sm focus:shadow-md text-gray-900 dark:text-gray-100"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button 
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center"
          aria-label="Clear search"
        >
          <span className="sr-only">Clear search</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>

    <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto px-4">
      <button
        onClick={() => setSelectedTag(null)}
        aria-pressed={selectedTag === null}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
          selectedTag === null
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 shadow-sm'
            : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50',
        )}
      >
        All Topics
      </button>

      {allTags.map(tag => (
        <button
          key={tag}
          onClick={() => setSelectedTag(tag)}
          aria-pressed={selectedTag === tag}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            selectedTag === tag
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 shadow-sm'
              : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50',
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);

const ArticlesList = ({ posts, isFiltered = false }: { posts: BlogPost[], isFiltered?: boolean }) => (
  <section aria-labelledby="articles-heading" className="mb-16">
    <div className="flex items-center justify-between mb-6">
      <h2 id="articles-heading" className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
        {isFiltered ? (
          <>
            <Search className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            Filtered Results
          </>
        ) : (
          <>
            <BookOpen className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            All Articles
          </>
        )}
      </h2>
      <div
        className="h-[1px] flex-grow mx-4 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
      <span
        className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
        {posts.length} {posts.length === 1 ? 'article' : 'articles'}
      </span>
    </div>

    {posts.length === 0 ? (
      <div
        className="text-center py-14 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-100 dark:border-gray-800"
      >
        <div
          className="mx-auto w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">No articles found</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-5 max-w-md mx-auto">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href={`/blog/${post.slug}`} 
                  className="block h-full" 
                  aria-label={`Read article: ${post.title}`}>
              <BlogCard post={post} />
            </Link>
          </motion.div>
        ))}
      </div>
    )}
  </section>
);

const CTASection = () => (
  <section aria-labelledby="cta-heading" className="relative overflow-hidden rounded-lg shadow-sm mb-8">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 to-indigo-600/90 z-0"></div>
    <div className="relative z-10 p-8 sm:p-10 text-center">
      <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-3 text-white">
        Ready to optimize your time off?
      </h2>
      <p className="text-blue-100 mb-5 max-w-xl mx-auto text-base leading-relaxed">
        Use our free tool to plan your PTO days strategically and maximize your time off
        without sacrificing productivity.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-white text-blue-600 px-5 py-2.5 text-base font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all transform hover:scale-105"
      >
        Try CTO Days Optimizer
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  </section>
);

const BackToTopButton = ({ show, onClick }: { show: boolean, onClick: () => void }) => (
  <AnimatePresence>
    {show && (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        onClick={onClick}
        className="fixed right-6 bottom-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50 transition-all"
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

  const regularPosts = (selectedTag === null && searchQuery === '')
    ? filteredPosts.filter(post => post.slug !== featuredPost.slug)
    : filteredPosts;

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    pageTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
        datePublished: post.isoDate,
      })),
    },
    name: 'Time Off Planning Resources',
    description: 'Helpful guides and resources to help you optimize your time off, improve work-life balance, and make the most of your personal days.',
  };

  return (
    <PageLayout>
      <Script
        id="blog-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        strategy="afterInteractive"
      />

      <div id="top" ref={pageTopRef} className="sr-only">Top of page</div>

      <PageHeader className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto text-center px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-5"
          >
            <span className="inline-block mb-2 px-4 py-1.5 text-sm font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/40 dark:text-blue-300 shadow-sm">
              Articles & Resources
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              <span className="text-blue-600 dark:text-blue-400 relative inline-block">
                Insights
              </span> for Better Time Off
            </h1>
            <PageDescription className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mx-auto max-w-2xl mt-4">
              Practical guides to help you optimize your time off, improve work-life balance,
              and make the most of your personal days.
            </PageDescription>
          </motion.div>
        </div>
      </PageHeader>

      <PageContent className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 py-8">
        <AIContentIndicator />

        <FilterSection 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={allTags}
        />

        {selectedTag === null && searchQuery === '' && (
          <FeaturedArticle featuredPost={featuredPost} />
        )}

        <ArticlesList 
          posts={regularPosts} 
          isFiltered={selectedTag !== null || searchQuery !== ''} 
        />

        <CTASection />
      </PageContent>

      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </PageLayout>
  );
} 