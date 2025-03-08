'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
}

interface TableOfContentsProps {
  contentId?: string;
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  contentId = 'blog-content',
  className
}) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // First try to find content by ID, then fallback to any article element
    const content = document.getElementById(contentId) || document.querySelector('article');
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

  // Count number of H2 headings for index
  const h2Count = headings.filter(h => h.level === 2).length;
  // If we have fewer than 2 h2 headings, don't show a ToC
  if (h2Count < 2) {
    return null;
  }

  return (
    <div className={cn("", className)}>
      <nav className="max-h-[calc(100vh-300px)] overflow-y-auto">
        <ul className="space-y-2">
          {headings.map((heading, index) => {
            // Calculate the number for h2 headings
            const h2Index = headings
              .filter(h => h.level === 2)
              .findIndex(h => h.id === heading.id);
            
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={cn(
                    "flex items-center py-1.5 text-sm transition-colors border-l-2 pl-3 hover:border-blue-500 dark:hover:border-blue-400",
                    heading.level === 3 && "pl-7",
                    activeId === heading.id
                      ? "text-blue-600 dark:text-blue-400 font-medium border-blue-500 dark:border-blue-400"
                      : "text-gray-700 dark:text-gray-300 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  {heading.level === 2 && h2Index >= 0 && (
                    <span className="mr-2 text-xs font-medium text-gray-500 dark:text-gray-400 w-5">
                      {h2Index + 1}.
                    </span>
                  )}
                  <span className="line-clamp-2">{heading.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}; 