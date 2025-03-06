import React from 'react';
import { Info, AlertCircle, LightbulbIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'tip' | 'warning';

interface CalloutProps {
  children: React.ReactNode;
  title?: string;
  type?: CalloutType;
  icon?: React.ReactNode;
  className?: string;
}

export const Callout = ({
  children,
  title,
  type = 'info',
  icon,
  className,
}: CalloutProps) => {
  // Define the styling based on callout type
  const styles = {
    info: {
      container: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
      title: 'text-blue-800 dark:text-blue-300',
      icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />,
    },
    tip: {
      container: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
      title: 'text-green-800 dark:text-green-300',
      icon: <LightbulbIcon className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />,
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
      title: 'text-amber-800 dark:text-amber-300',
      icon: <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />,
    },
  };

  const { container, title: titleStyle, icon: defaultIcon } = styles[type];

  return (
    <div
      className={cn(
        'p-4 rounded-lg border my-6 text-base',
        container,
        className
      )}
    >
      <div className="flex gap-3">
        <div className="mt-1">{icon || defaultIcon}</div>
        <div>
          {title && (
            <h4 className={cn('font-semibold mb-1', titleStyle)}>
              {title}
            </h4>
          )}
          <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}; 