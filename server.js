var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
const { getBSD, init, highGPA, allStudents } = require("./test2_module.js");

require("./test2_module.js");

const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs.engine({ extname: '.hbs'}));
app.set('view engine', '.hbs')

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/", function(req, res){
    res.render("home");
});

app.get("/BSD", function(req, res){
    getBSD()
    .then((data) => {
        res.render("students", {students: data})
    })
    .catch((err) => {
        res.render({message: err})
    });
});

app.get("/highGPA", function(req, res){
    highGPA()
    .then((highest) => {
        res.render("student", {students: highest})
    })
    .catch(function(msg){
        res.render({message: err})
    });
});

app.get("/allStudents", function(req, res){
    allStudents()
    .then((data) => {
        res.render("students", {students: data})
    })
    .catch((err) => {
        res.render({message: err})
    });
});

app.use((req, res) => {
    let resText = "<h3>Error 404</h3>";
    resText += "<p><b>Page Not Found!</b> <a href = '/'> Go Back Home </a></p>"
    res.status(404).send(resText);
  });

init()
.then(app.listen(HTTP_PORT, onHttpStart))
.catch(function(msg){
    console.log(msg);
});