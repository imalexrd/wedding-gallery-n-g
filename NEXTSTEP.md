# NEXTSTEP

## Project State
*   **Music Player:** Implemented a playlist system using `data/playlist.json`.
    *   The playlist JSON file contains an array of file paths (e.g., `["assets/music.mp3", "assets/song2.mp3"]`).
    *   Added a "Next" button (⏭) to the player controls.
    *   Audio automatically loops to the next song when one finishes.
    *   Audio files are expected to be in the `assets/` directory.
    *   Currently, the `assets` directory exists but is empty. The user needs to add MP3 files there and update `data/playlist.json` accordingly.
*   **Gallery:** Functional with upload (drag & drop) and lightbox viewing.
*   **Tech Stack:** PHP (simple server), Vanilla JS, CSS.

## Next Steps for Future Agents
1.  **Music Assets:** The `assets/` folder is currently empty (or contains dummy placeholders if not cleaned up). The end user should be instructed to place actual MP3 files there.
2.  **Playlist Configuration:** The `data/playlist.json` file has sample paths. These should be updated to match the actual files the user provides.
3.  **UI Refinement:**
    *   Consider adding a visual indicator of the current song index or total songs (e.g., "Song 1 of 3").
    *   Consider adding a "Previous" button if the playlist grows large.
4.  **Deployment:** Ensure the `assets/` directory and `data/` directory have appropriate write permissions if the user intends to manage them via a CMS or upload interface in the future (though currently it's manual).
