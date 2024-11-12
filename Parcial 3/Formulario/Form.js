const express = require("express");
var app = express();
 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
 
app.post("/formulario", function (req, res) {
  console.log(req.body);
  res.send(`Hola ${req.body.Nombre}`);
});
 
  app.listen(3000, function () {
    console.log("Aplicación ejemplo, escuchando el puerto 3000!");
  });
