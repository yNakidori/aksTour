/**
 * Compresses an image file client-side using a Canvas.
 * @param {File} file - Original image file
 * @param {number} maxWidth - Max width in pixels (default 800)
 * @param {number} quality - JPEG quality 0-1 (default 0.65)
 * @returns {Promise<File>} Compressed file
 */
export const compressImage = (file, maxWidth = 800, quality = 0.65) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) {
            resolve(
              new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
                type: "image/jpeg",
                lastModified: Date.now(),
              }),
            );
          } else {
            resolve(file);
          }
        },
        "image/jpeg",
        quality,
      );
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };

    img.src = url;
  });
};

/**
 * Compresses an image from a URL (for migrating existing images).
 * Fetches the image, draws on canvas, returns a Blob.
 * @param {string} imageUrl
 * @param {number} maxWidth
 * @param {number} quality
 * @returns {Promise<Blob>}
 */
export const compressImageFromUrl = (
  imageUrl,
  maxWidth = 800,
  quality = 0.65,
) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas toBlob returned null"));
          }
        },
        "image/jpeg",
        quality,
      );
    };

    img.onerror = reject;
    img.src = imageUrl;
  });
};
