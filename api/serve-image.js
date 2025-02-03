import fs from 'fs';

export default function handler(req, res) {
  const { file } = req.query;
  const filePath = decodeURIComponent(file);

  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'image/jpeg'); // Sesuaikan dengan format gambar
    const image = fs.createReadStream(filePath);
    image.pipe(res);

    // Hapus gambar setelah diunduh
    image.on('end', () => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Gagal menghapus file:', err);
        }
      });
    });
  } else {
    res.status(404).json({ message: 'File tidak ditemukan.' });
  }
}
