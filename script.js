document.addEventListener('DOMContentLoaded', () => {
    // --- State ---
    let galleryData = [];
    let currentLightboxIndex = 0;

    // --- DOM Elements ---
    const toggleUploadBtn = document.getElementById('toggleUploadBtn');
    const uploadSection = document.getElementById('uploadSection');
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const dropArea = document.getElementById('dropArea');
    const fileList = document.getElementById('fileList');
    const uploadSubmitBtn = document.getElementById('uploadSubmitBtn');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadStatus = document.getElementById('uploadStatus');
    const galleryGrid = document.getElementById('galleryGrid');

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxMediaContainer = document.getElementById('lightboxMediaContainer');
    const closeLightboxBtn = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    // Music
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const nextMusicBtn = document.getElementById('nextMusicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicStatus = document.getElementById('musicStatus');
    let isMusicPlaying = false;
    let playlist = [];
    let currentSongIndex = 0;

    // --- Initialization ---
    fetchGallery();
    fetchPlaylist();

    // --- Event Listeners ---

    // Toggle Upload Section
    toggleUploadBtn.addEventListener('click', () => {
        uploadSection.classList.toggle('hidden');
        if (!uploadSection.classList.contains('hidden')) {
            uploadSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // File Drop Area
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('is-active'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('is-active'), false);
    });

    dropArea.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFiles, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles({ target: { files: files } });
    }

    function handleFiles(e) {
        const files = e.target.files;
        if (files.length > 0) {
            fileList.innerHTML = '';
            Array.from(files).forEach(file => {
                const item = document.createElement('div');
                item.textContent = `📄 ${file.name} (${formatBytes(file.size)})`;
                fileList.appendChild(item);
            });
            uploadSubmitBtn.disabled = false;
            // Update input files if coming from drop
            if (e.target !== fileInput) {
                fileInput.files = files;
            }
        }
    }

    // Upload Form Submit
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const files = fileInput.files;
        if (files.length === 0) return;

        uploadData(files);
    });

    // Music Control
    musicToggleBtn.addEventListener('click', toggleMusic);
    nextMusicBtn.addEventListener('click', playNextSong);
    bgMusic.addEventListener('ended', playNextSong);

    // Lightbox Controls
    closeLightboxBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('visible')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        }
    });

    // --- Functions ---

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function toggleMusic() {
        if (playlist.length === 0) return;

        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggleBtn.textContent = 'Play';
            musicStatus.textContent = 'Music Paused';
            isMusicPlaying = false;
        } else {
            // Ensure src is set if it's empty (first play)
            if (!bgMusic.src && playlist.length > 0) {
                 bgMusic.src = playlist[currentSongIndex];
            }
            playAudio();
        }
    }

    function playAudio() {
        bgMusic.play().then(() => {
            musicToggleBtn.textContent = 'Pause';
            musicStatus.textContent = 'Playing...';
            isMusicPlaying = true;
        }).catch(e => {
            console.error("Audio playback error:", e);
            musicStatus.textContent = 'Playback Failed';
            alert("No se pudo reproducir la música: " + e.message);
            isMusicPlaying = false;
        });
    }

    function playNextSong() {
        if (playlist.length === 0) return;
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        bgMusic.src = playlist[currentSongIndex];
        playAudio();
    }

    function fetchPlaylist() {
        fetch('data/playlist.json')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    playlist = data;
                    currentSongIndex = 0;
                    // Preload the first song but don't play yet
                    bgMusic.src = playlist[0];
                } else {
                    console.log("Playlist is empty or invalid");
                }
            })
            .catch(error => console.error("Error loading playlist:", error));
    }

    function uploadData(files) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }

        uploadProgress.classList.remove('hidden');
        uploadSubmitBtn.disabled = true;
        uploadStatus.textContent = 'Subiendo...';
        uploadStatus.className = 'status-msg';

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'api/upload.php', true);

        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                uploadProgress.querySelector('.fill').style.width = percentComplete + '%';
            }
        };

        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.errors && response.errors.length > 0) {
                    uploadStatus.textContent = 'Subido con errores: ' + response.errors.join(', ');
                    uploadStatus.classList.add('error');
                } else {
                    uploadStatus.textContent = '¡Archivos subidos con éxito!';
                    uploadStatus.classList.add('success');
                    uploadForm.reset();
                    fileList.innerHTML = '';
                    setTimeout(() => {
                        uploadSection.classList.add('hidden');
                        uploadStatus.textContent = '';
                        uploadProgress.classList.add('hidden');
                        uploadProgress.querySelector('.fill').style.width = '0';
                        // Refresh gallery
                        fetchGallery();
                    }, 2000);
                }
            } else {
                uploadStatus.textContent = 'Error en la subida.';
                uploadStatus.classList.add('error');
            }
            uploadSubmitBtn.disabled = false;
        };

        xhr.onerror = function() {
            uploadStatus.textContent = 'Error de conexión.';
            uploadStatus.classList.add('error');
            uploadSubmitBtn.disabled = false;
        };

        xhr.send(formData);
    }

    function fetchGallery() {
        fetch('api/get_gallery.php')
            .then(response => response.json())
            .then(data => {
                galleryData = data;
                renderGallery(galleryData);
            })
            .catch(error => {
                console.error('Error fetching gallery:', error);
                galleryGrid.innerHTML = '<p>Error cargando la galería.</p>';
            });
    }

    function renderGallery(data) {
        galleryGrid.innerHTML = '';
        if (data.length === 0) {
            galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Aún no hay recuerdos. ¡Sé el primero en subir uno!</p>';
            return;
        }

        data.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'gallery-item';
            el.onclick = () => openLightbox(index);

            if (item.type === 'video') {
                el.innerHTML = `
                    <video src="${item.src}#t=1" preload="metadata"></video>
                    <div class="type-icon">▶</div>
                `;
            } else {
                el.innerHTML = `
                    <img src="${item.src}" alt="Wedding Memory" loading="lazy">
                `;
            }
            galleryGrid.appendChild(el);
        });
    }

    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightboxContent();
        lightbox.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('visible');
        lightboxMediaContainer.innerHTML = ''; // Stop video playback
        document.body.style.overflow = '';
    }

    function showNext() {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
        updateLightboxContent();
    }

    function showPrev() {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const item = galleryData[currentLightboxIndex];
        lightboxMediaContainer.innerHTML = '';

        let mediaEl;
        if (item.type === 'video') {
            mediaEl = document.createElement('video');
            mediaEl.src = item.src;
            mediaEl.controls = true;
            mediaEl.autoplay = true;
        } else {
            mediaEl = document.createElement('img');
            mediaEl.src = item.src;
        }

        lightboxMediaContainer.appendChild(mediaEl);
        downloadBtn.href = item.src;
    }
});
