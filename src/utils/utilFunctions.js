export function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.info('Texto copiado al portapapeles: ' + text);
    })
    .catch(err => {
      console.error('Error al copiar al portapapeles: ', err);
    });
}
