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
    // Upload gambar ke Vercel dan dapatkan URL untuk digunakan oleh API
    const formData = new FormData();
    formData.append('image', uploadImage.files[0]);

    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const uploadData = await uploadResponse.json();
    const imageUrl = uploadData.imageUrl;

    // Kirim URL gambar ke API untuk menghapus background
    const apiUrl = `https://api.paxsenix.biz.id/tools/removebg?url=${encodeURIComponent(imageUrl)}`;
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.ok) {
      throw new Error('Gagal menghapus background.');
    }

    const processedImageUrl = result.url;

    // Tampilkan hasil gambar tanpa background
    processedImage.src = processedImageUrl;
    processedImage.style.display = 'block';

    // Berikan link unduhan untuk gambar tanpa background
    downloadButton.href = processedImageUrl;
    downloadButton.style.display = 'inline-block';
  } catch (error) {
    alert('Terjadi kesalahan: ' + error.message);
  }
});
