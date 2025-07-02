/**
 * StatCard Component
 *
 * Displays a card with a statistic value, label, icon, and optional tooltip.
 * Uses a consistent color scheme system for styling.
 */
import { ReactNode, useState, useEffect, useRef, KeyboardEvent } from 'react';
import { COLOR_SCHEMES } from '@/constants';
import { PossibleColors } from '@/types';
import { cn } from '@/lib/utils';
import { InfoIcon as Icon_InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

export interface StatCardProps {
  value: number;
  label: string;
  tooltip: string;
  colorScheme: PossibleColors;
  icon: ReactNode;
}

/**
 * Helper function to ensure dynamic color classes are applied correctly
 * by using a lookup approach that forces Tailwind to recognize the classes
 */
const getColorClasses = (colorScheme: PossibleColors, type: 'bg' | 'text' | 'ring') =>
  COLOR_SCHEMES[colorScheme].icon[type];

/**
 * InfoIcon Component
 *
 * Displays an information icon with a tooltip using the same pattern as StepTooltip
 */
interface InfoIconProps {
  tooltip: string;
  label: string;
  colorScheme: PossibleColors;
}

const InfoIcon = ({ tooltip, label, colorScheme }: InfoIconProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipSide, setTooltipSide] = useState<'right' | 'left' | 'top' | 'bottom'>('left');
  const [tooltipAlign, setTooltipAlign] = useState<'start' | 'center' | 'end'>('center');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Handle click outside to close tooltip on mobile
  useEffect(() => {
    if (!isMobile || !tooltipOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(target) &&
        !triggerRef.current.contains(target)
      ) {
        setTooltipOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, tooltipOpen]);

  // Close tooltip on ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && tooltipOpen) {
        setTooltipOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscKey as unknown as EventListener);
    return () => {
      document.removeEventListener('keydown', handleEscKey as unknown as EventListener);
    };
  }, [tooltipOpen]);

  // Smart positioning to keep tooltip within viewport
  useEffect(() => {
    if (!tooltipOpen || !triggerRef.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Estimated tooltip dimensions with mobile considerations
      const tooltipWidth = isMobile ? Math.min(288, viewportWidth - 32) : 288;
      const tooltipHeight = 100; // Estimated height
      const padding = 16; // Safe padding from viewport edges

      let side: 'right' | 'left' | 'top' | 'bottom' = 'left';
      let align: 'start' | 'center' | 'end' = 'center';

      // Check if tooltip would go off-screen on the left (default side)
      if (triggerRect.left - tooltipWidth - 8 < padding) {
        // Check if there's space on the right
        if (triggerRect.right + tooltipWidth + 8 < viewportWidth - padding) {
          side = 'right';
          align = 'center';
        } else {
          // Use top or bottom if horizontal space is limited
          if (triggerRect.top - tooltipHeight - 8 > padding) {
            side = 'top';
          } else {
            side = 'bottom';
          }

          // For top/bottom positioning, check horizontal alignment
          const triggerCenter = triggerRect.left + triggerRect.width / 2;
          const halfTooltipWidth = tooltipWidth / 2;

          if (triggerCenter - halfTooltipWidth < padding) {
            // Would overflow on left, align to start
            align = 'start';
          } else if (triggerCenter + halfTooltipWidth > viewportWidth - padding) {
            // Would overflow on right, align to end
            align = 'end';
          } else {
            // Safe to center
            align = 'center';
          }
        }
      }

      setTooltipSide(side);
      setTooltipAlign(align);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [tooltipOpen, isMobile]);

  // Handle keyboard interactions
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setTooltipOpen(!tooltipOpen);
        break;
      case 'Escape':
        if (tooltipOpen) {
          e.preventDefault();
          setTooltipOpen(false);
        }
        break;
    }
  };

  // Handle click for mobile - improved to prevent conflicts
  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setTooltipOpen(!tooltipOpen);
    }
  };

  // Handle Radix UI's onOpenChange - prevent conflicts on mobile
  const handleOpenChange = (open: boolean) => {
    if (!isMobile) {
      // On desktop, let Radix UI handle the state normally
      setTooltipOpen(open);
    }
    // On mobile, ignore Radix UI's open change to prevent conflicts
  };

  // Map colorScheme to specific style classes - matching StepTooltip pattern
  const getTooltipColorClasses = (scheme: PossibleColors) => {
    switch (scheme) {
      case 'teal':
        return 'bg-teal-50/95 dark:bg-teal-900/90 border-teal-100 dark:border-teal-800/40 text-teal-900 dark:text-teal-100';
      case 'blue':
        return 'bg-blue-50/95 dark:bg-blue-900/90 border-blue-100 dark:border-blue-800/40 text-blue-900 dark:text-blue-100';
      case 'amber':
        return 'bg-amber-50/95 dark:bg-amber-900/90 border-amber-100 dark:border-amber-800/40 text-amber-900 dark:text-amber-100';
      case 'violet':
        return 'bg-violet-50/95 dark:bg-violet-900/90 border-violet-100 dark:border-violet-800/40 text-violet-900 dark:text-violet-100';
      case 'green':
        return 'bg-green-50/95 dark:bg-green-900/90 border-green-100 dark:border-green-800/40 text-green-900 dark:text-green-100';
      case 'red':
        return 'bg-red-50/95 dark:bg-red-900/90 border-red-100 dark:border-red-800/40 text-red-900 dark:text-red-100';
      case 'purple':
        return 'bg-purple-50/95 dark:bg-purple-900/90 border-purple-100 dark:border-purple-800/40 text-purple-900 dark:text-purple-100';
      case 'pink':
        return 'bg-pink-50/95 dark:bg-pink-900/90 border-pink-100 dark:border-pink-800/40 text-pink-900 dark:text-pink-100';
      case 'indigo':
        return 'bg-indigo-50/95 dark:bg-indigo-900/90 border-indigo-100 dark:border-indigo-800/40 text-indigo-900 dark:text-indigo-100';
      case 'emerald':
        return 'bg-emerald-50/95 dark:bg-emerald-900/90 border-emerald-100 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-100';
      case 'orange':
        return 'bg-orange-50/95 dark:bg-orange-900/90 border-orange-100 dark:border-orange-800/40 text-orange-900 dark:text-orange-100';
      case 'gray':
        return 'bg-gray-50/95 dark:bg-gray-900/90 border-gray-100 dark:border-gray-800/40 text-gray-900 dark:text-gray-100';
      default:
        return 'bg-gray-50/95 dark:bg-gray-900/90 border-gray-100 dark:border-gray-800/40 text-gray-900 dark:text-gray-100';
    }
  };

  const getIconColorClasses = (scheme: PossibleColors) => {
    switch (scheme) {
      case 'teal':
        return 'text-teal-500/70 dark:text-teal-400/70 hover:bg-teal-100/70 dark:hover:bg-teal-900/40 focus:ring-teal-500';
      case 'blue':
        return 'text-blue-500/70 dark:text-blue-400/70 hover:bg-blue-100/70 dark:hover:bg-blue-900/40 focus:ring-blue-500';
      case 'amber':
        return 'text-amber-500/70 dark:text-amber-400/70 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 focus:ring-amber-500';
      case 'violet':
        return 'text-violet-500/70 dark:text-violet-400/70 hover:bg-violet-100/70 dark:hover:bg-violet-900/40 focus:ring-violet-500';
      case 'green':
        return 'text-green-500/70 dark:text-green-400/70 hover:bg-green-100/70 dark:hover:bg-green-900/40 focus:ring-green-500';
      case 'red':
        return 'text-red-500/70 dark:text-red-400/70 hover:bg-red-100/70 dark:hover:bg-red-900/40 focus:ring-red-500';
      case 'purple':
        return 'text-purple-500/70 dark:text-purple-400/70 hover:bg-purple-100/70 dark:hover:bg-purple-900/40 focus:ring-purple-500';
      case 'pink':
        return 'text-pink-500/70 dark:text-pink-400/70 hover:bg-pink-100/70 dark:hover:bg-pink-900/40 focus:ring-pink-500';
      case 'indigo':
        return 'text-indigo-500/70 dark:text-indigo-400/70 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/40 focus:ring-indigo-500';
      case 'emerald':
        return 'text-emerald-500/70 dark:text-emerald-400/70 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 focus:ring-emerald-500';
      case 'orange':
        return 'text-orange-500/70 dark:text-orange-400/70 hover:bg-orange-100/70 dark:hover:bg-orange-900/40 focus:ring-orange-500';
      case 'gray':
        return 'text-gray-500/70 dark:text-gray-400/70 hover:bg-gray-100/70 dark:hover:bg-gray-900/40 focus:ring-gray-500';
      default:
        return 'text-gray-500/70 dark:text-gray-400/70 hover:bg-gray-100/70 dark:hover:bg-gray-900/40 focus:ring-gray-500';
    }
  };

  return (
    <Tooltip
      open={tooltipOpen}
      onOpenChange={handleOpenChange}
      disableHoverableContent={isMobile}
    >
      <TooltipTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className={`rounded-full p-1 ${getIconColorClasses(colorScheme)} cursor-help transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1`}
          aria-label={`Show information about ${label}`}
          aria-expanded={tooltipOpen}
          aria-describedby={
            tooltipOpen ? `tooltip-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined
          }
          aria-haspopup="dialog"
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          tabIndex={0}
        >
          <Icon_InfoIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        ref={contentRef}
        side={tooltipSide}
        align={tooltipAlign}
        className={`max-w-xs ${getTooltipColorClasses(colorScheme)} ${isMobile ? 'max-w-[calc(100vw-2rem)]' : ''}`}
        role="tooltip"
        id={`tooltip-${label.replace(/\s+/g, '-').toLowerCase()}`}
        collisionPadding={16}
        avoidCollisions={true}
        sticky="partial"
      >
        <div className="space-y-1 p-1">
          <p className="text-xs leading-relaxed">{tooltip}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

/**
 * IconContainer Component
 *
 * Displays an icon with the appropriate color scheme
 */
interface IconContainerProps {
  icon: ReactNode;
  colorScheme: PossibleColors;
}

const IconContainer = ({ icon, colorScheme }: IconContainerProps) => (
  <div
    className={cn(
      'h-10 w-10 rounded-lg flex items-center justify-center',
      'ring-1',
      getColorClasses(colorScheme, 'bg'),
      getColorClasses(colorScheme, 'text'),
      getColorClasses(colorScheme, 'ring')
    )}
    role="img"
    aria-hidden="true"
  >
    <div className="p-0.5">{icon}</div>
  </div>
);

/**
 * ValueDisplay Component
 *
 * Displays the statistic value
 */
interface ValueDisplayProps {
  value: number;
  colorScheme: PossibleColors;
}

const ValueDisplay = ({ value, colorScheme }: ValueDisplayProps) => {
  return (
    <div className="flex items-baseline gap-2">
      <p
        className={cn(
          'text-3xl font-bold tracking-tight leading-none',
          getColorClasses(colorScheme, 'text')
        )}
      >
        {value}
      </p>
    </div>
  );
};
/**
 * StatCard Component
 *
 * Main component that assembles all the sub-components
 */
const StatCard = ({ value, label, tooltip, colorScheme, icon }: StatCardProps) => {
  return (
    <article
      className={cn(
        'w-full',
        'rounded-lg p-4',
        'ring-1',
        COLOR_SCHEMES[colorScheme].icon.ring,
        'transition-all duration-200',
        'bg-white dark:bg-gray-800/60',
        'shadow-sm'
      )}
      aria-label={`${label}: ${value}`}
    >
      {/* Header with icon and tooltip */}
      <div className="flex items-center justify-between mb-3">
        <IconContainer icon={icon} colorScheme={colorScheme} />
        <InfoIcon tooltip={tooltip} label={label} colorScheme={colorScheme} />
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <p className={cn('text-sm font-medium', getColorClasses(colorScheme, 'text'))}>{label}</p>
        <ValueDisplay value={value} colorScheme={colorScheme} />
      </div>
    </article>
  );
};

export default StatCard;
