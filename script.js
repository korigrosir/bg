const uploadImage = document.getElementById('upload-image');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const removeBgButton = document.getElementById('remove-bg');

uploadImage.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };
  img.src = URL.createObjectURL(file);
});

removeBgButton.addEventListener('click', () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = data.slice(i, i + 4);

    // Hapus warna hampir putih
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);
});
