
async function toBase64(file: File, format:string, maxWidth?: number, maxHeight?: number): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        let newWidth = width;
        let newHeight = height;

        if (maxWidth && maxHeight) {
          if (width > maxWidth || height > maxHeight) {
            const widthRatio = maxWidth / width;
            const heightRatio = maxHeight / height;
            const scale = Math.min(widthRatio, heightRatio);
            newWidth = width * scale;
            newHeight = height * scale;
          }
        } else if (maxHeight) {
          if (height > maxHeight) {
            const scale = maxHeight / height;
            newWidth = width * scale;
            newHeight = maxHeight;
          }
        } else if (maxWidth) {
          if (width > maxWidth) {
            const scale = maxWidth / width;
            newWidth = maxWidth;
            newHeight = height * scale;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          const resizedBase64 = canvas.toDataURL('image/png');
          resolve(resizedBase64);
        }
      };
    };

    reader.onerror = (error) => {
      console.error('Error al procesar la imagen:', error);
      resolve(null);
    };

    reader.readAsDataURL(file);
  });
}

export default toBase64;
