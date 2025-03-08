import { Logo } from '@/components/Logo';
import { cn, spacing } from '@/lib/utils';
import { GitHubLink } from '@/components/ui/github-link';
import { GITHUB_URL } from '@/constants';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const Header = () => (
  <header className={cn(
    'sticky top-0 z-40 w-full',
    'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
    'border-b border-gray-200/60 dark:border-gray-700/30',
  )}>
    <div className={cn(
      'mx-auto max-w-7xl',
      spacing.container,
    )}>
      <div className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <nav className="hidden sm:flex items-center space-x-4">
            <Link
              href="/blog"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors relative"
            >
              <BookOpen className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              <span>Blog</span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                <span className="animate-pulse">5</span>
              </span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/blog"
            className="sm:hidden inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900/30 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors relative"
            aria-label="Blog"
          >
            <BookOpen className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
              <span className="animate-pulse">5</span>
            </span>
          </Link>
          <GitHubLink
            href={GITHUB_URL}
            variant="default"
            className="hidden sm:inline-flex"
          />
          <GitHubLink
            href={GITHUB_URL}
            variant="compact"
            className="sm:hidden"
          />
        </div>
      </div>
    </div>
  </header>
);

export default Header;