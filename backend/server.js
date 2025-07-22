import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import admin from 'firebase-admin';

dotenv.config();

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
    'http://127.0.0.1:5500', // Untuk pengembangan lokal
    'https://prototype-xi-c.vercel.app' // URL Vercel frontend Anda
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json({ limit: '50mb' }));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

app.post('/upload-ebook', async (req, res) => {
    try {
        const { fileName, fileContent } = req.body;

        if (!fileName || !fileContent) {
            return res.status(400).json({ success: false, message: 'File name and content are required.' });
        }

        const allowedExtensions = ['pdf', 'epub', 'docx', 'txt'];
        const fileExtension = fileName.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).json({ success: false, message: 'Unsupported file type. Allowed: PDF, EPUB, DOCX, TXT.' });
        }

        const uploadResult = await cloudinary.uploader.upload(fileContent, {
            resource_type: "raw",
            public_id: fileName.split('.')[0],
            folder: "ebooks_xi_c",
            overwrite: true
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

app.get('/api/tasks', async (req, res) => {
    try {
        const tasksSnapshot = await db.collection('tasks').orderBy('createdAt', 'desc').get();
        const tasks = tasksSnapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error fetching tasks from Firestore:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch tasks.', error: error.message });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const { judul, mapel, deadline, isi } = req.body;

        if (!judul || !mapel || !deadline || !isi) {
            return res.status(400).json({ success: false, message: 'All task fields (judul, mapel, deadline, isi) are required.' });
        }

        const newTaskRef = await db.collection('tasks').add({
            judul,
            mapel,
            deadline,
            isi,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        const newTaskDoc = await newTaskRef.get();
        const newTaskData = { _id: newTaskDoc.id, ...newTaskDoc.data() };

        res.status(201).json({ success: true, message: 'Task added successfully!', task: newTaskData });
    } catch (error) {
        console.error('Error adding task to Firestore:', error);
        res.status(500).json({ success: false, message: 'Failed to add task.', error: error.message });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, mapel, deadline, isi } = req.body;

        if (!judul || !mapel || !deadline || !isi) {
            return res.status(400).json({ success: false, message: 'All task fields (judul, mapel, deadline, isi) are required for update.' });
        }

        const taskRef = db.collection('tasks').doc(id);
        const doc = await taskRef.get();

        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Task not found.' });
        }

        await taskRef.update({
            judul,
            mapel,
            deadline,
            isi,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        const updatedDoc = await taskRef.get();
        const updatedTask = { _id: updatedDoc.id, ...updatedDoc.data() };

        res.status(200).json({ success: true, message: 'Task updated successfully!', task: updatedTask });
    } catch (error) {
        console.error('Error updating task in Firestore:', error);
        res.status(500).json({ success: false, message: 'Failed to update task.', error: error.message });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const taskRef = db.collection('tasks').doc(id);

        const doc = await taskRef.get();
        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Task not found.' });
        }

        await taskRef.delete();
        res.status(200).json({ success: true, message: 'Task deleted successfully!' });
    } catch (error) {
        console.error('Error deleting task from Firestore:', error);
        res.status(500).json({ success: false, message: 'Failed to delete task.', error: error.message });
    }
});

app.listen(port, () => {
    const currentDateTime = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    console.log(`[${currentDateTime}] Backend server running on http://localhost:${port}`);
    console.log(`[${currentDateTime}] Cloudinary Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    console.log(`[${currentDateTime}] Connected to Firebase Project: ${serviceAccount.project_id}`);
});