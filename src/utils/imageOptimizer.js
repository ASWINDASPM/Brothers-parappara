/**
 * Browser-side Image Optimizer & WebP Converter
 * Uses native HTML5 Canvas to convert and compress any image to modern WebP format
 * before uploading to Supabase Storage.
 */

export async function convertToWebP(
  file, 
  { 
    quality = 0.85, 
    maxWidth = 1920, 
    maxHeight = 1920 
  } = {}
) {
  // If it's not a raster image or is an SVG, do not convert to canvas
  if (!file || !file.type.startsWith('image/') || file.type === 'image/svg+xml') {
    return {
      file,
      originalSize: file?.size || 0,
      newSize: file?.size || 0,
      savingsPercent: 0,
      isConverted: false
    };
  }

  const originalSize = file.size;

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onerror = () => {
      console.warn('Could not read image file for WebP conversion, falling back to original.');
      resolve({
        file,
        originalSize,
        newSize: originalSize,
        savingsPercent: 0,
        isConverted: false
      });
    };

    reader.onload = (event) => {
      const img = new Image();

      img.onerror = () => {
        console.warn('Could not decode image for WebP conversion, falling back to original.');
        resolve({
          file,
          originalSize,
          newSize: originalSize,
          savingsPercent: 0,
          isConverted: false
        });
      };

      img.onload = () => {
        try {
          let width = img.naturalWidth || img.width;
          let height = img.naturalHeight || img.height;

          // Scale down proportionally if larger than maximum constraints
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({
              file,
              originalSize,
              newSize: originalSize,
              savingsPercent: 0,
              isConverted: false
            });
            return;
          }

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Convert canvas content to WebP blob
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve({
                  file,
                  originalSize,
                  newSize: originalSize,
                  savingsPercent: 0,
                  isConverted: false
                });
                return;
              }

              // Create filename with .webp extension
              const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
              const webpFileName = `${baseName}.webp`;

              const webpFile = new File([blob], webpFileName, {
                type: 'image/webp',
                lastModified: Date.now()
              });

              const newSize = webpFile.size;
              const savingsPercent = originalSize > 0 
                ? Math.max(0, Math.round(((originalSize - newSize) / originalSize) * 100))
                : 0;

              resolve({
                file: webpFile,
                originalSize,
                newSize,
                savingsPercent,
                isConverted: true,
                dimensions: { width, height }
              });
            },
            'image/webp',
            quality
          );
        } catch (err) {
          console.warn('Canvas WebP conversion error:', err);
          resolve({
            file,
            originalSize,
            newSize: originalSize,
            savingsPercent: 0,
            isConverted: false
          });
        }
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}
