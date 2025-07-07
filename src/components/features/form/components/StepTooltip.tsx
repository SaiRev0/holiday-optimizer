import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export interface StepTooltipProps {
  /**
   * The title of the tooltip content
   */
  title: string;
  /**
   * The description text for the tooltip
   */
  description: string;
  /**
   * The color scheme to use for styling (matches step colors)
   */
  colorScheme: 'teal' | 'blue' | 'amber' | 'violet';
  /**
   * The aria-label for the tooltip trigger button
   */
  ariaLabel: string;
}

export function StepTooltip({ title, description, colorScheme, ariaLabel }: StepTooltipProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipSide, setTooltipSide] = useState<'right' | 'left' | 'top' | 'bottom'>('right');
  const [tooltipAlign, setTooltipAlign] = useState<'start' | 'center' | 'end'>('start');
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
    if (!tooltipOpen) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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

      let side: 'right' | 'left' | 'top' | 'bottom' = 'right';
      let align: 'start' | 'center' | 'end' = 'start';

      // Check if tooltip would go off-screen on the right
      if (triggerRect.right + tooltipWidth + 8 > viewportWidth - padding) {
        // Check if there's space on the left
        if (triggerRect.left - tooltipWidth - 8 > padding) {
          side = 'left';
          align = 'start';
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

  // Handle click for mobile - simplified approach
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

  // Map colorScheme to specific style classes
  const colorClasses = {
    teal: {
      hover: 'hover:bg-teal-100/70 dark:hover:bg-teal-900/40',
      ring: 'focus:ring-teal-500',
      icon: 'text-teal-500/70 dark:text-teal-400/70',
      content:
        'bg-teal-50/95 dark:bg-teal-900/90 border-teal-100 dark:border-teal-800/40 text-teal-900 dark:text-teal-100',
      header: 'text-teal-800 dark:text-teal-300',
      text: 'text-teal-700/90 dark:text-teal-300/90',
    },
    blue: {
      hover: 'hover:bg-blue-100/70 dark:hover:bg-blue-900/40',
      ring: 'focus:ring-blue-500',
      icon: 'text-blue-500/70 dark:text-blue-400/70',
      content:
        'bg-blue-50/95 dark:bg-blue-900/90 border-blue-100 dark:border-blue-800/40 text-blue-900 dark:text-blue-100',
      header: 'text-blue-800 dark:text-blue-300',
      text: 'text-blue-700/90 dark:text-blue-300/90',
    },
    amber: {
      hover: 'hover:bg-amber-100/70 dark:hover:bg-amber-900/40',
      ring: 'focus:ring-amber-500',
      icon: 'text-amber-500/70 dark:text-amber-400/70',
      content:
        'bg-amber-50/95 dark:bg-amber-900/90 border-amber-100 dark:border-amber-800/40 text-amber-900 dark:text-amber-100',
      header: 'text-amber-800 dark:text-amber-300',
      text: 'text-amber-700/90 dark:text-amber-300/90',
    },
    violet: {
      hover: 'hover:bg-violet-100/70 dark:hover:bg-violet-900/40',
      ring: 'focus:ring-violet-500',
      icon: 'text-violet-500/70 dark:text-violet-400/70',
      content:
        'bg-violet-50/95 dark:bg-violet-900/90 border-violet-100 dark:border-violet-800/40 text-violet-900 dark:text-violet-100',
      header: 'text-violet-800 dark:text-violet-300',
      text: 'text-violet-700/90 dark:text-violet-300/90',
    },
  };

  return (
    <Tooltip open={tooltipOpen} onOpenChange={handleOpenChange} disableHoverableContent={isMobile}>
      <TooltipTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className={`rounded-full p-1 ${colorClasses[colorScheme].hover} cursor-help transition-colors focus:outline-none focus:ring-2 ${colorClasses[colorScheme].ring} focus:ring-offset-1`}
          aria-label={ariaLabel}
          aria-expanded={tooltipOpen}
          aria-describedby={
            tooltipOpen ? `tooltip-${title.replace(/\s+/g, '-').toLowerCase()}` : undefined
          }
          aria-haspopup="dialog"
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          tabIndex={0}
        >
          <Info className={`h-3.5 w-3.5 ${colorClasses[colorScheme].icon}`} aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        ref={contentRef}
        side={tooltipSide}
        align={tooltipAlign}
        className={`max-w-xs ${colorClasses[colorScheme].content} ${isMobile ? 'max-w-[calc(100vw-2rem)]' : ''}`}
        role="tooltip"
        id={`tooltip-${title.replace(/\s+/g, '-').toLowerCase()}`}
        collisionPadding={16}
        avoidCollisions={true}
        sticky="partial"
      >
        <div className="space-y-2 p-1">
          <h4 className={`font-medium ${colorClasses[colorScheme].header} text-sm`}>{title}</h4>
          <p className={`text-xs ${colorClasses[colorScheme].text} leading-relaxed`}>
            {description}
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
