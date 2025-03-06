import { Logo } from '@/components/Logo';
import { cn, spacing } from '@/lib/utils';
import { GitHubLink } from '@/components/ui/github-link';
import { GITHUB_URL } from '@/constants';
import Link from 'next/link';

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
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
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