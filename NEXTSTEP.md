# Instructions for Next Steps

## Project Context
This project is a **Wedding Gallery SPA (Single Page Application)** built with raw PHP, HTML5, CSS3, and Vanilla JavaScript.
- **Backend**: PHP (no frameworks).
- **Storage**: JSON file (`data/gallery.json`) stores metadata. Images/Videos are stored in `uploads/`.
- **Frontend**: One file (`index.php`) serves the layout. `script.js` handles AJAX uploads and the gallery render. `style.css` handles the "Elegant Gold/Beige" theme.

## Project Structure
```
/
├── index.php            # Main SPA entry point
├── style.css            # Global styles (Responsive, Flex/Grid)
├── script.js            # Frontend logic (Gallery, Upload, Modal, Music)
├── api/
│   ├── upload.php       # Handles file uploads (validates ext, size, saves to folders, updates JSON)
│   └── get_gallery.php  # Returns JSON content of gallery.json
├── data/
│   └── gallery.json     # Database for media items
├── uploads/
│   ├── photos/          # Photo storage
│   └── videos/          # Video storage
└── assets/              # (Optional) Static assets like background music or placeholder images
```

## Completed Tasks
- **Animated "Golden Glitter" Title**: Implemented a pure CSS shimmering gold gradient on the main title ("Nallely & Gil"). Updated `style.css` to include `@keyframes shine` and adjusted the hero overlay opacity to `0.7` for better contrast.

## Next Task: Image Lazy Loading & Optimization
The gallery grid loads all images at once. As the gallery grows, this will impact performance.

**Requirements:**
1. **Lazy Loading**: Implement native `loading="lazy"` on image tags in `script.js`.
2. **Thumbnail Generation**: (Optional but recommended) Update `api/upload.php` to generate smaller thumbnails for the grid view, serving full resolution only in the lightbox.
3. **Pagination/Infinite Scroll**: If the list gets too long (e.g., > 50 items), implement "Load More" button or infinite scroll.
