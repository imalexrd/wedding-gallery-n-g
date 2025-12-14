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

## Next Task: Animated "Golden Glitter" Title
The current Hero section displays the text "Nallely & Gil Wedding". The goal for the next iteration is to **significantly upgrade the visual impact of this text**.

**Requirements:**
1. **Visual Style**: The text should look elegant and "magical".
2. **Effect**: Implement a **"Golden Glitter"** animation.
   - This could be achieved via CSS `background-clip: text` with an animated gold texture.
   - Or a subtle particle effect (canvas or CSS) around the text.
   - It must feel premium and romantic, not cheap or distracting.
3. **Responsiveness**: Ensure the effect works on mobile devices and remains readable.
4. **Integration**: Modify `index.php` (if HTML structure changes needed) and `style.css`. Do not break the existing upload/gallery functionality.

## Tips for Implementation
- Look into CSS gradients with `@keyframes` moving background positions for a shimmering gold effect.
- Ensure the contrast against the background image (defined in `.hero` class in `style.css`) remains high. The current implementation uses a dark overlay (`rgba(0,0,0,0.6)`), which should be preserved or adjusted carefully.
