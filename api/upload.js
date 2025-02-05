import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Nonaktifkan body parser karena kita akan memproses form-data manual
  },
};

export default function handler(req, res) {
  const form = new IncomingForm();
  
  form.uploadDir = path.join('/tmp'); // Folder sementara Vercel
  form.keepExtensions = true; // Pertahankan ekstensi file asli

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal memproses gambar.' });
    }

    const uploadedImagePath = files.image[0].path; // Lokasi gambar yang diupload
    const imageUrl = `https://remover-bg-one.vercel.app/api/serve-image?file=${encodeURIComponent(uploadedImagePath)}`;

    res.status(200).json({
      message: 'Upload berhasil',
      imageUrl: imageUrl,
    });
  });
}
