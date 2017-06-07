var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// var db = require('./models');
var helpers = require('handlebars-helpers')();
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

//connect to mongoose
mongoose.connect("mongodb://localhost/mongoscraperDB");
var db = mongoose.conection;

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + "/public"));
app.use(methodOverride("_method"));

var router = require('./controllers/mongo-scraper_controller.js');
app.use('/', router);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(port, function() {
    console.log('Listening on port ' + port);
})