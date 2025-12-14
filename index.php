<?php
// Configuración Principal
$heroImage = 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'; // Foto Principal
$bgMusic = 'assets/music.mp3'; // Música de Fondo
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nallely & Gil Wedding | 12.12.25</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <!-- Simple lightbox library if needed, but going Vanilla first as planned -->
</head>
<body>

    <header class="hero" style="background-image: url('<?php echo $heroImage; ?>');">
        <div class="overlay"></div>
        <div class="hero-content">
            <h1>Nallely & Gil</h1>
            <p class="date">Diciembre 12, 2025</p>
            <p class="welcome-text">Gracias por celebrar con nosotros. Comparte tus momentos favoritos aquí.</p>
        </div>
    </header>

    <main class="container">

        <!-- Controls Section -->
        <section class="controls">
            <button id="toggleUploadBtn" class="btn btn-primary">📷 Subir Fotos/Videos</button>

            <div class="audio-player">
                <span class="icon">🎵</span>
                <span id="musicStatus">Music Paused</span>
                <button id="musicToggleBtn" class="btn btn-small">Play</button>
                <button id="nextMusicBtn" class="btn btn-small" title="Siguiente Canción">⏭</button>
                <audio id="bgMusic">
                    Tu navegador no soporta el elemento de audio.
                </audio>
            </div>
        </section>

        <!-- Upload Section (Hidden by default) -->
        <section id="uploadSection" class="upload-section hidden">
            <div class="upload-card">
                <h2>Subir Recuerdos</h2>
                <form id="uploadForm">
                    <div class="file-drop-area" id="dropArea">
                        <span class="fake-btn">Elige archivos</span>
                        <span class="file-msg">o arrástralos aquí</span>
                        <input class="file-input" type="file" name="files[]" id="fileInput" multiple accept=".jpg,.jpeg,.png,.gif,.mp4,.mov">
                    </div>
                    <p class="info-text">Formatos: JPG, PNG, MP4. Máx 20MB.</p>
                    <div id="fileList" class="file-list"></div>
                    <button type="submit" class="btn btn-submit" id="uploadSubmitBtn" disabled>Subir</button>
                    <div id="uploadProgress" class="progress-bar hidden"><div class="fill"></div></div>
                    <div id="uploadStatus" class="status-msg"></div>
                </form>
            </div>
        </section>

        <!-- Gallery Grid -->
        <section class="gallery-section">
            <div id="galleryGrid" class="gallery-grid">
                <!-- Gallery items will be injected here -->
                <div class="loading-spinner">Cargando galería...</div>
            </div>
        </section>

        <!-- Thank You Message -->
        <section class="thank-you">
            <p>¡Gracias por ser parte de nuestra historia!</p>
        </section>

    </main>

    <!-- Lightbox Modal -->
    <div id="lightbox" class="lightbox hidden">
        <span id="closeLightbox" class="close">&times;</span>
        <div class="lightbox-content">
            <div id="lightboxMediaContainer"></div>
        </div>
        <a id="downloadBtn" class="download-btn" href="#" download>⬇ Descargar</a>
        <a class="prev" id="prevBtn">&#10094;</a>
        <a class="next" id="nextBtn">&#10095;</a>
    </div>

    <script src="script.js"></script>
</body>
</html>
