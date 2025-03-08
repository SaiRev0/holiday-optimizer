import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BlogPostImageProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export function BlogPostImage({
  src,
  alt,
  caption,
  priority = false,
  width = 1200,
  height = 675,
  className,
}: BlogPostImageProps) {
  return (
    <figure className={cn("my-8 overflow-hidden not-prose", className)}>
      <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
        {src.startsWith('http') ? (
          // For external URLs, use regular img tag
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className="w-full h-auto"
          />
        ) : (
          // For internal images, use Next.js Image
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="w-full h-auto"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
} 