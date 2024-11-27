const express = require("express");
const path = require("path");
const multer = require("multer");
const pdf = require("pdfkit");
const fs = require("fs");
const cors = require("cors");

const app = express();
const folder = path.join(__dirname, "./archivos");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/Formulario", upload.single("archivo"), (req, res) => {
    try {
        if (req.file && req.body.Nombre) {
            console.log(`Archivo recibido: ${req.file.originalname}`);
            console.log(`Hola ${req.body.Nombre}`);
           
            const doc = new pdf();
            const pdfPath = path.join(folder, `${req.body.Nombre}.pdf`);
            const pdfStream = fs.createWriteStream(pdfPath);

            doc.pipe(pdfStream);
            doc
                .fontSize(20)
                .fillColor("blue")
                .text(`Pdf creado. Su nombre es: ${req.body.Nombre}`, {
                    align: "center"
                });

            const imagePath = req.file.path;
            doc.image(imagePath, {
                fit: [250, 300],
                align: "center",
                valign: "center",
            });

            doc.end();

            pdfStream.on("finish", () => {
                console.log("PDF creado exitosamente.");
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", `attachment; filename="${req.body.Nombre}.pdf"`);
                res.sendFile(pdfPath);
            });

            pdfStream.on("error", (err) => {
                throw err;
            });
        } else {
            throw "Faltan datos, asegúrese de enviar el nombre y el archivo";
        }
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: err });
    }
});

app.listen(8080, () => {
    console.log("Aplicación escuchando en el puerto 8080");
});
