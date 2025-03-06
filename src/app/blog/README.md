# Blog Content Guidelines

This directory contains the blog content for CTO Planner. Follow these guidelines when creating or editing blog posts to ensure consistency, proper semantic HTML structure, and optimal reader experience.

## Creating a New Blog Post

1. Create a new directory for your blog post using kebab-case:
   ```
   src/app/blog/your-blog-post-title/
   ```

2. Copy `_template.tsx.example` as a starting point:
   ```
   cp src/app/blog/_template.tsx.example src/app/blog/your-blog-post-title/page.tsx
   ```

3. Update the metadata and content with your blog post information.

## Semantic HTML Structure

All blog posts should follow this semantic HTML structure:

```tsx
<BlogPostLayout
  title="Your Post Title"
  description="Your post description"
  date="Month DD, YYYY"
  readTime="X min read"
  publishedDate="2024-00-00T00:00:00Z"
  author="Author Name" // Optional
  authorRole="Author Title" // Optional
  authorImageUrl="/path/to/image.jpg" // Optional
  tags={["Tag1", "Tag2"]} // Optional
  featuredImage="/path/to/featured-image.jpg" // Optional
>
  <section>
    <h2 id="section-id">Section Title</h2>
    <p>
      Section content...
    </p>
    
    <h3 id="subsection-id">Subsection Title</h3>
    <p>
      Subsection content...
    </p>
    
    <ul>
      <li>List item one</li>
      <li>List item two</li>
    </ul>
  </section>
  
  {/* Enhanced Components */}
  <Callout title="Important Note" type="info">
    This is an important callout with useful information.
  </Callout>
  
  <BlogPostImage 
    src="/path/to/image.jpg" 
    alt="Descriptive alt text" 
    caption="Optional image caption" 
  />
  
  {/* More sections */}
</BlogPostLayout>
```

### Key Elements

- Wrap each major section in a `<section>` tag
- Use `<h2>` for main section headings and `<h3>` for subsections
- Add an `id` attribute to all headings for deep linking and table of contents generation
- Use proper semantic elements for lists:
  - `<ul>` for unordered (bullet) lists
  - `<ol>` for ordered (numbered) lists
  - `<li>` for all list items
- Use `<p>` tags for paragraphs
- Use `<strong>` for bold text and `<em>` for italic text
- Use `<code>` for inline code snippets

## Enhanced Components

### Table of Contents

The Table of Contents is automatically generated from your headings. Ensure all your headings have proper `id` attributes.

### Callouts

Use the `Callout` component to highlight important information:

```tsx
import { Callout } from '@/components/blog/Callout';

// Info callout (default)
<Callout title="Note">
  This is an informational callout.
</Callout>

// Tip callout
<Callout title="Tip" type="tip">
  This is a helpful tip for your readers.
</Callout>

// Warning callout
<Callout title="Warning" type="warning">
  This is an important warning.
</Callout>
```

### Optimized Images

Use the `BlogPostImage` component for optimized images with captions:

```tsx
import { BlogPostImage } from '@/components/blog/BlogPostImage';

<BlogPostImage 
  src="/images/your-image.jpg" 
  alt="Descriptive alt text" 
  caption="Optional caption text that appears below the image" 
  width={800} // Optional
  height={500} // Optional
  priority={true} // Optional, use for above-the-fold images
/>
```

## Required Metadata

Each blog post requires proper metadata for SEO:

```tsx
export const metadata: Metadata = {
  title: `Article Title | ${PROJECT_NAME}`,
  description: 'Meta description (150-160 characters with keywords)',
  openGraph: {
    title: `Article Title | ${PROJECT_NAME}`,
    description: 'Same as meta description',
    type: 'article',
    publishedTime: '2024-00-00T00:00:00Z', // ISO date format
    images: [
      {
        url: 'https://ctoplanner.com/images/blog/article-slug/featured-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Descriptive alt text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Article Title',
    description: 'A compelling description for Twitter',
    images: ['https://ctoplanner.com/images/blog/article-slug/featured-image.jpg'],
  },
  alternates: {
    canonical: 'https://ctoplanner.com/blog/your-blog-post-title',
  },
};
```

## BlogPostLayout Props

The `BlogPostLayout` component accepts the following props:

```tsx
<BlogPostLayout
  title="Article Title" // Required
  description="Brief description displayed under the title" // Required
  date="Month DD, YYYY" // Required, display date
  readTime="X min read" // Required, estimate read time
  publishedDate="2024-00-00T00:00:00Z" // Required, ISO date for schema
  author="Author Name" // Optional, defaults to "Waqar Kalim"
  authorRole="Author Title" // Optional, defaults to "Developer & Time Management Enthusiast"
  authorImageUrl="/path/to/image.jpg" // Optional
  tags={["Tag1", "Tag2"]} // Optional, for categorization
  featuredImage="/path/to/featured-image.jpg" // Optional, hero image
>
  {/* Content */}
</BlogPostLayout>
```

## Adding to the Blog Index

After creating a new blog post, add it to the `blogPosts` array in `src/app/blog/page.tsx` and to the sitemap in `src/app/sitemap.ts`.

## Content Best Practices

### Writing Style
- Use a conversational, clear tone
- Keep paragraphs short (3-5 sentences)
- Use active voice rather than passive voice
- Begin with a compelling introduction that states the problem and solution
- End with a clear call to action

### SEO Optimization
- Include target keywords in the title, meta description, and headings
- Use keyword-rich headings that describe the content clearly
- Include internal links to other blog posts or the main tool
- Add external links to authoritative sources when appropriate
- Include alt text for all images

### Reader Experience
- Use lists for easily scannable content
- Break up long text with images, callouts, or quotes
- Use descriptive subheadings to guide users through the content
- Consider adding a summary at the beginning for longer articles
- Include practical, actionable advice that readers can implement

### Engagement
- Ask questions to encourage engagement
- Include social sharing buttons (automatically added)
- Consider adding interactive elements where appropriate
- End with a discussion question or call for comments

## Testing Your Blog Post

Always test your blog post by:
1. Checking the rendering on both desktop and mobile 
2. Validating that all links work correctly
3. Ensuring proper rendering of lists and other formatted content
4. Verifying schema markup with Google's Rich Results Test
5. Testing the table of contents navigation
6. Checking that images load properly with appropriate alt text
7. Verifying that social sharing works correctly 