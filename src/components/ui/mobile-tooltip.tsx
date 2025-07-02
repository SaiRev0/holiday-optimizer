'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MobileTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
  contentClassName?: string;
  sideOffset?: number;
  delayDuration?: number;
  skipDelayDuration?: number;
  disabled?: boolean;
}

export const MobileTooltip: React.FC<MobileTooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  className,
  contentClassName,
  sideOffset = 4,
  delayDuration = 100,
  skipDelayDuration = 300,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement>(null);

  // Handle click outside to close tooltip on mobile
  React.useEffect(() => {
    if (!isMobile || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(target) &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, open]);

  // Handle ESC key to close tooltip
  React.useEffect(() => {
    if (!open) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        // Return focus to trigger element
        if (triggerRef.current) {
          const focusableElement =
            (triggerRef.current.querySelector('[tabindex="0"]') as HTMLElement) ||
            (triggerRef.current.querySelector('button') as HTMLElement) ||
            (triggerRef.current as HTMLElement);
          focusableElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [open]);

  // Smart positioning to keep tooltip within viewport
  const [finalSide, setFinalSide] = React.useState(side);
  const [finalAlign, setFinalAlign] = React.useState(align);

  React.useEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // More accurate tooltip dimensions
      const tooltipWidth = isMobile ? Math.min(288, viewportWidth - 32) : 288;
      const tooltipHeight = 80;

      let newSide = side;
      let newAlign = align;

      // Check vertical positioning
      if (side === 'top' && triggerRect.top < tooltipHeight + sideOffset + 16) {
        newSide = 'bottom';
      } else if (
        side === 'bottom' &&
        triggerRect.bottom > viewportHeight - tooltipHeight - sideOffset - 16
      ) {
        newSide = 'top';
      }

      // Check horizontal positioning for left/right sides
      if (side === 'left' && triggerRect.left < tooltipWidth + sideOffset + 16) {
        newSide = 'right';
      } else if (
        side === 'right' &&
        triggerRect.right > viewportWidth - tooltipWidth - sideOffset - 16
      ) {
        newSide = 'left';
      }

      // Improved alignment adjustment for left-side overflow
      if (newSide === 'top' || newSide === 'bottom') {
        const tooltipCenterX = triggerRect.left + triggerRect.width / 2;
        const halfTooltipWidth = tooltipWidth / 2;

        // Check if tooltip would overflow on the left
        if (tooltipCenterX - halfTooltipWidth < 16) {
          newAlign = 'start';
        }
        // Check if tooltip would overflow on the right
        else if (tooltipCenterX + halfTooltipWidth > viewportWidth - 16) {
          newAlign = 'end';
        }
        // Keep original alignment if no overflow detected
        else {
          newAlign = align;
        }
      }

      setFinalSide(newSide);
      setFinalAlign(newAlign);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [open, side, align, sideOffset, isMobile]);

  const handleTriggerClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!open);
    },
    [open]
  );

  const handleTriggerKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(!open);
      }
    },
    [open]
  );

  // Control tooltip open state properly
  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      // On mobile, only allow programmatic control
      if (!isMobile) {
        setOpen(newOpen);
      }
    },
    [isMobile]
  );

  if (disabled) {
    return <>{children}</>;
  }

  // Clone children to add event handlers
  const enhancedChildren = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        onClick: (event: React.MouseEvent) => {
          // Call existing onClick if it exists
          const originalOnClick = (children as React.ReactElement<Record<string, unknown>>).props
            ?.onClick;
          if (originalOnClick && typeof originalOnClick === 'function') {
            originalOnClick(event);
          }
          handleTriggerClick(event);
        },
        onKeyDown: (event: React.KeyboardEvent) => {
          // Call existing onKeyDown if it exists
          const originalOnKeyDown = (children as React.ReactElement<Record<string, unknown>>).props
            ?.onKeyDown;
          if (originalOnKeyDown && typeof originalOnKeyDown === 'function') {
            originalOnKeyDown(event);
          }
          handleTriggerKeyDown(event);
        },
      })
    : children;

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <TooltipPrimitive.Root
        open={open}
        onOpenChange={handleOpenChange}
        disableHoverableContent={isMobile}
      >
        <TooltipPrimitive.Trigger asChild className={className}>
          {enhancedChildren}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            ref={contentRef}
            side={finalSide}
            align={finalAlign}
            sideOffset={sideOffset}
            className={cn(
              'z-[9999] max-w-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              'border bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-popover-foreground shadow-lg rounded-md',
              // Mobile-specific adjustments
              isMobile && 'max-w-[calc(100vw-2rem)] mx-2',
              contentClassName
            )}
            collisionPadding={16}
            avoidCollisions={true}
            sticky="partial"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-white dark:fill-gray-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

// Colored version that matches the existing StatTooltipContent design
interface MobileColoredTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  colorScheme: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
  sideOffset?: number;
  delayDuration?: number;
  skipDelayDuration?: number;
  disabled?: boolean;
}

export const MobileColoredTooltip: React.FC<MobileColoredTooltipProps> = ({
  content,
  children,
  colorScheme,
  side = 'top',
  align = 'center',
  className,
  sideOffset = 4,
  delayDuration = 100,
  skipDelayDuration = 300,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement>(null);

  // Handle click outside to close tooltip on mobile
  React.useEffect(() => {
    if (!isMobile || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(target) &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, open]);

  // Handle ESC key to close tooltip
  React.useEffect(() => {
    if (!open) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        // Return focus to trigger element
        if (triggerRef.current) {
          const focusableElement =
            (triggerRef.current.querySelector('[tabindex="0"]') as HTMLElement) ||
            (triggerRef.current.querySelector('button') as HTMLElement) ||
            (triggerRef.current as HTMLElement);
          focusableElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [open]);

  // Smart positioning to keep tooltip within viewport
  const [finalSide, setFinalSide] = React.useState(side);
  const [finalAlign, setFinalAlign] = React.useState(align);

  React.useEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // More accurate tooltip dimensions
      const tooltipWidth = isMobile ? Math.min(288, viewportWidth - 32) : 288;
      const tooltipHeight = 80;

      let newSide = side;
      let newAlign = align;

      // Check vertical positioning
      if (side === 'top' && triggerRect.top < tooltipHeight + sideOffset + 16) {
        newSide = 'bottom';
      } else if (
        side === 'bottom' &&
        triggerRect.bottom > viewportHeight - tooltipHeight - sideOffset - 16
      ) {
        newSide = 'top';
      }

      // Check horizontal positioning for left/right sides
      if (side === 'left' && triggerRect.left < tooltipWidth + sideOffset + 16) {
        newSide = 'right';
      } else if (
        side === 'right' &&
        triggerRect.right > viewportWidth - tooltipWidth - sideOffset - 16
      ) {
        newSide = 'left';
      }

      // Improved alignment adjustment for left-side overflow
      if (newSide === 'top' || newSide === 'bottom') {
        const tooltipCenterX = triggerRect.left + triggerRect.width / 2;
        const halfTooltipWidth = tooltipWidth / 2;

        // Check if tooltip would overflow on the left
        if (tooltipCenterX - halfTooltipWidth < 16) {
          newAlign = 'start';
        }
        // Check if tooltip would overflow on the right
        else if (tooltipCenterX + halfTooltipWidth > viewportWidth - 16) {
          newAlign = 'end';
        }
        // Keep original alignment if no overflow detected
        else {
          newAlign = align;
        }
      }

      setFinalSide(newSide);
      setFinalAlign(newAlign);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [open, side, align, sideOffset, isMobile]);

  const handleTriggerClick = React.useCallback(
    (event: React.MouseEvent) => {
      // Only handle clicks on mobile to prevent conflicts
      if (isMobile) {
        event.preventDefault();
        event.stopPropagation();
        setOpen(!open);
      }
    },
    [open, isMobile]
  );

  const handleTriggerKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(!open);
      }
    },
    [open]
  );

  // Control tooltip open state properly - improved mobile handling
  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isMobile) {
        // On desktop, let Radix UI handle the state normally
        setOpen(newOpen);
      }
      // On mobile, ignore Radix UI's open change to prevent conflicts
    },
    [isMobile]
  );

  if (disabled) {
    return <>{children}</>;
  }

  // Clone children to add event handlers
  const enhancedChildren = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        onClick: (event: React.MouseEvent) => {
          // Call existing onClick if it exists
          const originalOnClick = (children as React.ReactElement<Record<string, unknown>>).props
            ?.onClick;
          if (originalOnClick && typeof originalOnClick === 'function') {
            originalOnClick(event);
          }
          handleTriggerClick(event);
        },
        onKeyDown: (event: React.KeyboardEvent) => {
          // Call existing onKeyDown if it exists
          const originalOnKeyDown = (children as React.ReactElement<Record<string, unknown>>).props
            ?.onKeyDown;
          if (originalOnKeyDown && typeof originalOnKeyDown === 'function') {
            originalOnKeyDown(event);
          }
          handleTriggerKeyDown(event);
        },
      })
    : children;

  // Get color scheme classes based on the colorScheme prop
  const getColorClasses = (scheme: string) => {
    // This mirrors the logic from the original StatTooltipContent
    if (scheme === 'teal') {
      return 'bg-teal-50/95 dark:bg-teal-900/90 border-teal-100 dark:border-teal-800/40 text-teal-900 dark:text-teal-100';
    } else if (scheme === 'blue') {
      return 'bg-blue-50/95 dark:bg-blue-900/90 border-blue-100 dark:border-blue-800/40 text-blue-900 dark:text-blue-100';
    } else if (scheme === 'amber') {
      return 'bg-amber-50/95 dark:bg-amber-900/90 border-amber-100 dark:border-amber-800/40 text-amber-900 dark:text-amber-100';
    } else if (scheme === 'violet') {
      return 'bg-violet-50/95 dark:bg-violet-900/90 border-violet-100 dark:border-violet-800/40 text-violet-900 dark:text-violet-100';
    } else if (scheme === 'green') {
      return 'bg-green-50/95 dark:bg-green-900/90 border-green-100 dark:border-green-800/40 text-green-900 dark:text-green-100';
    } else if (scheme === 'red') {
      return 'bg-red-50/95 dark:bg-red-900/90 border-red-100 dark:border-red-800/40 text-red-900 dark:text-red-100';
    } else if (scheme === 'purple') {
      return 'bg-purple-50/95 dark:bg-purple-900/90 border-purple-100 dark:border-purple-800/40 text-purple-900 dark:text-purple-100';
    } else if (scheme === 'pink') {
      return 'bg-pink-50/95 dark:bg-pink-900/90 border-pink-100 dark:border-pink-800/40 text-pink-900 dark:text-pink-100';
    } else if (scheme === 'indigo') {
      return 'bg-indigo-50/95 dark:bg-indigo-900/90 border-indigo-100 dark:border-indigo-800/40 text-indigo-900 dark:text-indigo-100';
    } else if (scheme === 'emerald') {
      return 'bg-emerald-50/95 dark:bg-emerald-900/90 border-emerald-100 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-100';
    } else if (scheme === 'orange') {
      return 'bg-orange-50/95 dark:bg-orange-900/90 border-orange-100 dark:border-orange-800/40 text-orange-900 dark:text-orange-100';
    } else if (scheme === 'past') {
      return 'bg-gray-50/95 dark:bg-gray-900/90 border-gray-100 dark:border-gray-800/40 text-gray-900 dark:text-gray-100';
    }
    // Default fallback
    return 'bg-gray-50/95 dark:bg-gray-900/90 border-gray-100 dark:border-gray-800/40 text-gray-900 dark:text-gray-100';
  };

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <TooltipPrimitive.Root
        open={open}
        onOpenChange={handleOpenChange}
        disableHoverableContent={isMobile}
      >
        <TooltipPrimitive.Trigger asChild className={className}>
          {enhancedChildren}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            ref={contentRef}
            side={finalSide}
            align={finalAlign}
            sideOffset={sideOffset}
            className={cn(
              'z-[9999] max-w-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              'rounded-md border px-2 py-2 shadow-lg',
              // Mobile-specific adjustments
              isMobile && 'max-w-[calc(100vw-2rem)] mx-2',
              // Color scheme
              getColorClasses(colorScheme)
            )}
            collisionPadding={16}
            avoidCollisions={true}
            sticky="partial"
          >
            {content}
            <TooltipPrimitive.Arrow
              className={cn(
                'fill-current',
                colorScheme === 'teal' && 'text-teal-50 dark:text-teal-900',
                colorScheme === 'blue' && 'text-blue-50 dark:text-blue-900',
                colorScheme === 'amber' && 'text-amber-50 dark:text-amber-900',
                colorScheme === 'violet' && 'text-violet-50 dark:text-violet-900',
                colorScheme === 'green' && 'text-green-50 dark:text-green-900',
                colorScheme === 'red' && 'text-red-50 dark:text-red-900',
                colorScheme === 'purple' && 'text-purple-50 dark:text-purple-900',
                colorScheme === 'pink' && 'text-pink-50 dark:text-pink-900',
                colorScheme === 'indigo' && 'text-indigo-50 dark:text-indigo-900',
                colorScheme === 'emerald' && 'text-emerald-50 dark:text-emerald-900',
                colorScheme === 'orange' && 'text-orange-50 dark:text-orange-900',
                colorScheme === 'past' && 'text-gray-50 dark:text-gray-900'
              )}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
