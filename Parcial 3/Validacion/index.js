const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { jsPDF } = require('jspdf');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join(__dirname, 'archivos');
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/; 
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png, gif).'));
    },
    limits: { fileSize: 5 * 1024 * 1024 }, 
});

const validateForm = [
    check('nombre')
        .isAlpha()
        .withMessage('El nombre debe contener solo letras.')
        .notEmpty()
        .withMessage('El nombre es obligatorio.'),
    check('apellido')
        .isAlpha()
        .withMessage('El apellido debe contener solo letras.')
        .notEmpty()
        .withMessage('El apellido es obligatorio.'),
];

app.post('/formulario', upload.single('archivo'), validateForm, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    try {
        const { nombre, apellido } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No se subió un archivo o el archivo no es válido.' });
        }

        const archivoPath = req.file.path;

        const doc = new jsPDF();

        doc.text(`Hola, ${nombre} ${apellido}`, 10, 10);

        const imageData = fs.readFileSync(archivoPath, { encoding: 'base64' });
        doc.addImage(`data:image/jpeg;base64,${imageData}`, 'JPEG', 10, 20, 50, 50);

        const pdfFolder = path.join(__dirname, 'archivosgen');
        if (!fs.existsSync(pdfFolder)) fs.mkdirSync(pdfFolder);
        const pdfPath = path.join(pdfFolder, `${Date.now()}-output.pdf`);
        fs.writeFileSync(pdfPath, doc.output());

        res.sendFile(pdfPath);
    } catch (error) {
        console.error('Error al generar el PDF:', error.message);
        res.status(500).send('Error al generar el PDF.');
    }
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    }
    if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
});

app.listen(8088, () => {
    console.log('Servidor escuchando en el puerto 8088');
});
