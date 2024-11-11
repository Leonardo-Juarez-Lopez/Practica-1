const express = require("express");
const path = require("path");
var app = express();
 
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));
 
app.get("/", function (req, res) {
    //res.send("Hola Mundo!");
    console.log(req.query);
    res.render('admin');
});
 
app.listen(3000, function () {
  console.log("Aplicación ejemplo, escuchando el puerto 3000!");
});