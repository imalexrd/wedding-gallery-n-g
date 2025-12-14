# NEXTSTEP

## Project State
*   **Music Player:** Implemented a playlist system using `data/playlist.json`.
    *   The playlist JSON file contains an array of file paths (e.g., `["assets/music.mp3", "assets/song2.mp3"]`).
    *   Added a "Next" button (⏭) to the player controls.
    *   Audio automatically loops to the next song when one finishes.
    *   Audio files are expected to be in the `assets/` directory.
    *   **CRITICAL:** The `assets` directory is currently empty. The user needs to add valid MP3 files there and update `data/playlist.json` accordingly. Empty files will cause playback errors.
*   **Gallery:** Functional with upload (drag & drop) and lightbox viewing.
*   **Tech Stack:** PHP (simple server), Vanilla JS, CSS.

## Next Steps for Future Agents
1.  **Music Assets:** INSTRUCT THE USER to place actual `.mp3` files in the `assets/` folder. The current code expects files but the folder is empty.
2.  **Playlist Configuration:** The `data/playlist.json` file has sample paths. These should be updated to match the actual files the user provides.
3.  **UI Refinement:**
    *   Consider adding a visual indicator of the current song index or total songs (e.g., "Song 1 of 3").
    *   Consider adding a "Previous" button if the playlist grows large.
4.  **Error Handling:** The current player uses `alert()` for playback errors. This was requested for debugging but might be too intrusive for production. Consider replacing it with a toast message or status text.
