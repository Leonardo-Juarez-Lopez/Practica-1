const express = require("express");
var app = express();

app.get('/', function(req, res) {
  res.send("Hello World!");
  console.log("Hola Mundo Express 1");
});

app.listen(3000, function () {
    console.log("Hola Mundo Express 2");
});