'use client';

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
}

interface TableOfContentsProps {
  contentId?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  contentId = 'blog-content' 
}) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const content = document.getElementById(contentId);
    if (!content) return;

    // Find all h2 and h3 headings in the content
    const headingElements = content.querySelectorAll('h2[id], h3[id]');
    
    const items: TOCItem[] = Array.from(headingElements).map(heading => ({
      id: heading.id,
      text: heading.textContent || '',
      level: heading.tagName === 'H2' ? 2 : 3,
      element: heading as HTMLElement
    }));

    setHeadings(items);

    // Set up intersection observer to track the section currently in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
      }
    );

    // Observe all heading elements
    headingElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      headingElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [contentId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 py-4 rounded-lg bg-gray-50 border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700">
      <div className="px-4 mb-4 font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <List className="h-5 w-5" />
        <span>Table of Contents</span>
      </div>
      <nav className="max-h-[calc(100vh-300px)] overflow-y-auto">
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={cn(
                  "block py-1.5 px-4 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/50",
                  heading.level === 3 && "pl-8",
                  activeId === heading.id
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-700 dark:text-gray-300"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}; 