# Using Unsplash Images in Blog Posts

This guide provides instructions on how to properly use Unsplash images in blog posts for CTO Planner.

## Unsplash License

Unsplash provides free high-quality images under the [Unsplash License](https://unsplash.com/license):

- All photos on Unsplash are free to use for commercial and non-commercial purposes
- Attribution is not required but appreciated by photographers
- Photos cannot be sold without significant modification
- Photos cannot be compiled into a similar or competing service

## How to Find and Use Unsplash Images

1. Visit [Unsplash.com](https://unsplash.com/)
2. Search for relevant images using keywords related to your blog post topic
3. When you find an appropriate image, click on it and then click the "Download" button
4. You can also directly use the Unsplash image URL format in your blog posts

## Using Unsplash Images in Blog Posts

### Image URL Format

Unsplash image URLs can be used directly with query parameters for optimization:

```
https://images.unsplash.com/[PHOTO-ID]?auto=format&fit=crop&w=1200&q=80
```

Parameters explained:
- `auto=format`: Automatically optimizes the image format
- `fit=crop`: Ensures the image properly fills the specified dimensions
- `w=1200`: Sets the width to 1200px
- `q=80`: Sets the quality to 80% (good balance between quality and file size)

### Example Implementation

```tsx
// In the metadata section
images: [
  {
    url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
    width: 1200,
    height: 630,
    alt: 'Descriptive alt text for your featured image',
  },
],

// For the featured image
featuredImage="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80"

// For inline images
<BlogPostImage
  src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1200&q=80" 
  alt="Descriptive alt text for the image"
  caption="Optional caption explaining the significance of this image. Photo by Erik Lucatero on Unsplash."
  priority={true} // Set to true for above-the-fold images
/>
```

## Best Practices

1. **Choose Relevant Images**: Select images that directly relate to your content
2. **Provide Proper Attribution**: While not required, include photographer credit in the caption
3. **Use Descriptive Alt Text**: Ensure all images have descriptive alt text for accessibility
4. **Set Priority for Above-the-Fold Images**: Use `priority={true}` for images that appear when the page first loads
5. **Optimize for Performance**: Use the URL parameters to control image size and quality
6. **Add Meaningful Captions**: Captions should add context and explain the image's relevance

## Finding the Right Images

Good categories for CTO Planner blog posts:
- Calendars and planning tools
- People enjoying time off/vacations
- Nature and travel destinations
- Workplace/office settings with relaxed atmosphere
- Productivity tools and workspaces

## Recommended Photographers on Unsplash

These Unsplash photographers consistently provide high-quality images relevant to our content:
- Erik Lucatero (productivity and workplace)
- Annie Spratt (calendars and organization)
- Yuri Levin (travel destinations)
- Towfiqu barbhuiya (planning and organization)
- Estée Janssens (desk setups and organization)

## Technical Notes

When updating a blog post, make sure to:

1. Update both the `metadata.openGraph.images` URL and the `featuredImage` prop
2. For Twitter cards, update the image URL there as well
3. Use the same image for consistency across platforms
4. Make sure the image dimensions are properly specified (typically 1200×630 for featured images) 