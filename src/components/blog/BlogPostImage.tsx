import React from 'react';
import { cn } from '@/lib/utils';

interface BlogPostImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const BlogPostImage = ({
                                src,
                                alt,
                                caption,
                                width = 1200,
                                height = 800,
                                className,
                                priority = false,
                              }: BlogPostImageProps) => {
  return (
    <figure className={cn('my-8', className)}>
      <div
        className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
        {src.startsWith('http') || src.startsWith('/') ? (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            className="w-full h-auto object-cover"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-cover"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}; 