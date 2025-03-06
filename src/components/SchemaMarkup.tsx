import React from 'react';
import Script from 'next/script';

interface BlogPostSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  authorName?: string;
  canonicalUrl: string;
  imageUrl?: string;
}

export const BlogPostSchema: React.FC<BlogPostSchemaProps> = ({
  title,
  description,
  datePublished,
  authorName = 'CTO Planner Team',
  canonicalUrl,
  imageUrl = 'https://ctoplanner.com/og-image.jpg',
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: title,
    description: description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CTO Planner',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ctoplanner.com/logo.png',
      },
    },
    datePublished: datePublished,
    dateModified: datePublished,
  };

  return (
    <Script
      id="blog-post-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
};

interface FAQSchemaProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ questions }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
};

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: {
    name: string;
    text: string;
    url?: string;
    imageUrl?: string;
  }[];
  totalTime?: string; // ISO 8601 duration format (e.g., "PT2H30M")
  canonicalUrl: string;
  imageUrl?: string;
}

export const HowToSchema: React.FC<HowToSchemaProps> = ({
  name,
  description,
  steps,
  totalTime,
  canonicalUrl,
  imageUrl,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    totalTime: totalTime,
    image: imageUrl,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      url: step.url || `${canonicalUrl}#step-${index + 1}`,
      name: step.name,
      itemListElement: {
        '@type': 'HowToDirection',
        text: step.text,
      },
      image: step.imageUrl,
    })),
  };

  return (
    <Script
      id="how-to-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}; 