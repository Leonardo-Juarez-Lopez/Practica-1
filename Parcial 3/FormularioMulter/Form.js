const express = require("express");
var app = express();
const path = require("path");
const multer = require("multer");
 
const folder = path.join(__dirname+ '/archivos/');
const upload = multer({dest:folder});
 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(upload.single(`archivo`));
 
app.post("/formulario", function (req, res) {
  console.log(req.body);
  res.send(`Hola ${req.body.Nombre}`);
});
 
  app.listen(3000, function () {
    console.log("Aplicación ejemplo, escuchando el puerto 3000!");
  });

  function obtenerDatos() {
    var Nombre=document.getElementById('Nombre').Value;
    var NumTelefono = document.getElementById('NumTelefono').Value;
    var CorreoElec = document.getElementById('CorreoElec').Value;
  }