const express = require("express");
var app = express();
 
app.use(express.json());
 
app.get("/Maestros", function (req, res) {
  console.log(req.body);
  res.send()
});
 
  app.get("/Estudiante/:Carrera", function (req, res) {
    console.log(req.params.Carrera);
    console.log(req.query.control);
    res.send()
});
 
app.get("/Administrativos", function (req, res) {
  console.log(req.query);
  res.send()
});
 
  app.listen(3000, function () {
    console.log("Aplicación ejemplo, escuchando el puerto 3000!");
  });
