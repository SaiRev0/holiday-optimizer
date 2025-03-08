import React from 'react';
import { Info, AlertTriangle, Check, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'warning' | 'tip' | 'success';

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  type?: CalloutType;
  className?: string;
}

export function Callout({ title, children, type = 'info', className }: CalloutProps) {
  const Icon = {
    info: Info,
    warning: AlertTriangle,
    tip: MoveRight,
    success: Check,
  }[type];

  const styles = {
    info: {
      container: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
      icon: 'text-blue-500 dark:text-blue-400',
      title: 'text-blue-800 dark:text-blue-300',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
      icon: 'text-amber-500 dark:text-amber-400',
      title: 'text-amber-800 dark:text-amber-300',
    },
    tip: {
      container: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800',
      icon: 'text-emerald-500 dark:text-emerald-400',
      title: 'text-emerald-800 dark:text-emerald-300',
    },
    success: {
      container: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
      icon: 'text-green-500 dark:text-green-400',
      title: 'text-green-800 dark:text-green-300',
    },
  }[type];

  return (
    <div className={cn(
      'my-6 rounded-lg border p-5 not-prose',
      styles.container,
      className
    )}>
      <div className="flex items-start">
        <Icon className={cn('h-5 w-5 mr-3 mt-0.5', styles.icon)} />
        <div className="flex-1">
          {title && (
            <h5 className={cn('font-semibold mb-2', styles.title)}>
              {title}
            </h5>
          )}
          <div className="text-gray-700 dark:text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 