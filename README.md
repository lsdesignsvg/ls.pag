# LS Designs

Sitio web estático para presentar los servicios de diseño deportivo de LS Designs y mostrar una galería de trabajos. No necesita un proceso de compilación ni dependencias de Node.js.

## Páginas

- `index.html`: página principal con servicios, proceso de trabajo, vista previa del portafolio, preguntas frecuentes y contacto por WhatsApp.
- `disenos.html`: galería de 12 imágenes. Cada imagen se puede ampliar y cerrar con el botón, haciendo clic fuera de ella o pulsando `Esc`.

## Archivos principales

- `service-worker.js`: guarda en caché las páginas y las miniaturas incluidas en `APP_SHELL`; los originales se almacenan al ampliarlos. Cuando se agrega, elimina o cambia el nombre de una miniatura, actualiza la lista y cambia `CACHE_NAME` para renovar la caché.
- `manifest.json`: nombre, colores e iconos usados al instalar el sitio como aplicación.
- `portada1.jpg`: imagen de portada y vista previa al compartir el sitio.
- `logo-ls-designs.png` y `LOGO-LS-DESGINS.svg`: versiones del logotipo.
- `jersey*.webp` y `jersey manga larga*.webp`: imágenes de diseño disponibles en el proyecto; algunos archivos se usan en la página principal.
- `chaqueta corta vientos*.webp` y otras imágenes WebP: recursos de la galería y archivos gráficos del proyecto.
- `previews/`: miniaturas WebP de hasta 1200 px, usadas para cargar la galería con menos datos. Los originales se conservan y se abren al ampliar una tarjeta.

## Ver el sitio localmente

Se puede abrir `index.html` directamente en un navegador para revisar las páginas. Para probar el sitio mediante HTTP —necesario para que funcione el service worker— inicia un servidor local desde la carpeta del proyecto:

```powershell
py -m http.server 8000
```

Después, abre `http://localhost:8000`. También puedes usar la extensión Live Server de Visual Studio Code.

No hay pruebas automatizadas ni comandos de compilación configurados. Después de editar, comprueba manualmente ambas páginas, los enlaces, las imágenes y la galería ampliada.

## Actualizar la galería

1. Copia los originales WebP a la carpeta raíz del proyecto y crea una miniatura optimizada en `previews/` para cada imagen. Con el codificador `cwebp` instalado, este comando genera una miniatura de hasta 1200 px con calidad 90 y conserva el perfil ICC:

   ```powershell
   cwebp -preset picture -q 90 -m 6 -resize 1200 1200 -metadata icc "imagen.webp" -o "previews/imagen.webp"
   ```

   La miniatura ocupa menos espacio para la vista de galería; al ampliarla, se sigue usando el original.
2. Edita la lista `<ul class="gallery">` de `disenos.html`: usa la miniatura en el atributo `src` del `<img>` y el nombre del original en `data-full` del botón. Actualiza también `alt`, `aria-label` y el texto de la tarjeta.
3. Añade a `APP_SHELL` en `service-worker.js` la ruta de la miniatura y cambia el valor de `CACHE_NAME`. El original se guarda en caché automáticamente cuando se solicita al ampliar la imagen.
4. Comprueba que cada ruta coincida exactamente con el nombre del archivo, que las miniaturas carguen en la página y que al ampliar se abra el original.

## Publicar en GitHub Pages

El proyecto contiene los archivos estáticos necesarios, pero no incluye un flujo de GitHub Actions. Para publicar sin añadir uno:

1. Sube el contenido del proyecto a un repositorio de GitHub.
2. En el repositorio, abre **Settings > Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**, elige la rama que contiene el sitio y la carpeta `/(root)`, y guarda.
4. Espera a que termine el despliegue y abre la URL que muestra GitHub Pages.

Las imágenes y páginas deben permanecer en las rutas indicadas en el HTML para que los enlaces, la caché y los metadatos de vista previa funcionen correctamente.
