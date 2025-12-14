# Wedding Gallery Nallely & Gil

Una aplicación web de galería interactiva para la boda de Nallely y Gil (12.12.25). Permite a los invitados subir y visualizar fotos y videos.

## Características

-   **SPA (Single Page Application):** Todo ocurre en una sola vista sin recargas.
-   **Galería Multimedia:** Grid responsivo para fotos y videos.
-   **Subida de Archivos:** Soporte para múltiples archivos (imágenes y videos) con validación.
-   **Lightbox:** Visualizador de medios a pantalla completa.
-   **Almacenamiento JSON:** Sin necesidad de base de datos MySQL compleja.
-   **Diseño Elegante:** Tema dorado y beige.

## Requisitos

-   PHP 7.4 o superior.
-   Servidor web (Apache, Nginx, o PHP built-in server).

## Instalación

1.  Clonar el repositorio.
2.  Asegurarse de que las carpetas `uploads/photos`, `uploads/videos` y `data` tengan permisos de escritura.
    ```bash
    chmod -R 755 uploads data
    ```
3.  (Opcional) Colocar un archivo de música en `assets/music.mp3` para la música de fondo.

## Ejecución Local

Para probar el proyecto localmente sin configurar Apache/Nginx:

1.  Abrir una terminal en la carpeta del proyecto.
2.  Ejecutar el servidor de desarrollo de PHP:
    ```bash
    php -S localhost:8000
    ```
3.  Abrir `http://localhost:8000` en el navegador.

## Estructura de Archivos

-   `index.php`: Página principal.
-   `style.css`: Estilos.
-   `script.js`: Lógica frontend.
-   `api/`: Endpoints de backend (upload y get_gallery).
-   `data/gallery.json`: "Base de datos" de la galería.
-   `uploads/`: Almacenamiento de archivos subidos.
