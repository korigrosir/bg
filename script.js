const uploadImage = document.getElementById('upload-image');
const removeBgButton = document.getElementById('remove-bg');
const originalImage = document.getElementById('original-image');
const processedImage = document.getElementById('processed-image');
const downloadButton = document.getElementById('download-btn');
let uploadedImageUrl = '';

uploadImage.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImageUrl = e.target.result;
    originalImage.src = uploadedImageUrl;
    originalImage.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

removeBgButton.addEventListener('click', async () => {
  if (!uploadedImageUrl) {
    alert('Pilih gambar terlebih dahulu!');
    return;
  }

  try {
    // Kirim permintaan ke API Paxsenix
    const apiUrl = `https://api.paxsenix.biz.id/tools/removebg?url=${uploadedImageUrl}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Gagal menghapus background.');
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    
    processedImage.src = imageUrl;
    processedImage.style.display = 'block';
    downloadButton.href = imageUrl;
    downloadButton.style.display = 'inline-block';
  } catch (error) {
    alert('Terjadi kesalahan: ' + error.message);
  }
});
