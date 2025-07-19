// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware
// Penting: Sesuaikan 'origin' dengan URL frontend Anda
// Untuk pengembangan lokal, bisa 'http://localhost:5500' (jika pakai Live Server)
// Untuk produksi, ganti dengan URL deployment frontend Anda (misalnya: https://your-xic-app.vercel.app)
app.use(cors({
    origin: 'http://127.0.0.1:5500' // Pastikan ini sesuai dengan alamat frontend lokal Anda
}));
app.use(express.json({ limit: '50mb' })); // Batasi ukuran payload JSON (penting untuk Base64 file)

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Use HTTPS
});

// Ebook Upload Endpoint
app.post('/upload-ebook', async (req, res) => {
  try {
    const { fileName, fileContent } = req.body; // fileContent is base64 string

    if (!fileName || !fileContent) {
      return res.status(400).json({ success: false, message: 'File name and content are required.' });
    }

    // Validate file extension (optional, but good practice)
    const allowedExtensions = ['pdf', 'epub', 'docx', 'txt'];
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ success: false, message: 'Unsupported file type. Allowed: PDF, EPUB, DOCX, TXT.' });
    }

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(fileContent, {
      resource_type: "raw", // Important for non-image/video files (PDF, DOCX, etc.)
      public_id: fileName.split('.')[0], // Use filename as public_id
      folder: "ebooks_xi_c", // Folder in Cloudinary for your ebooks
      overwrite: true // Overwrite if file with same public_id exists
    });

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully!',
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      bytes: uploadResult.bytes,
      format: uploadResult.format
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ success: false, message: 'File upload failed.', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
  console.log(`Cloudinary Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
});