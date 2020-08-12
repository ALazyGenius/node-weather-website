const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geoCode.js");
const foreCast = require("./utils/foreCast.js");

const app = express();

//Define paths for expess config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//To set up handlebars engine, views location and partials path
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//To set up static directory to serve
app.use(express.static(publicDirectoryPath));

//Root - http://localhost:3000
app.get("", (req, res) => {
  //To be sent back to user - rendered from handlebar
  //name of view to match with string in render
  res.render("index", {
    title: "Weather App",
    name: "Akash Mishra",
  });
});

//About - http://localhost:3000/about
app.get("/about", (req, res) => {
  //To be sent back to user - rendered from handlebar
  //name of view to match with string in render
  res.render("about", {
    title: "About me",
    name: "Akash Mishra",
  });
});

//Help - http://localhost:3000/help
app.get("/help", (req, res) => {
  //To be sent back to user - rendered from handlebar
  //name of view to match with string in render
  res.render("help", {
    helpText: "I need help",
    title: "Help",
    name: "Akash Mishra",
  });
});

//Error help - http://localhost:3000/help/me
app.get("/help/*", (req, res) => {
  res.render("404-page", {
    errorMsg: "Help article not found.",
    title: "404",
    name: "Akash Mishra",
  });
});

//Weather - http://localhost:3000/weather?address=Philadelphia
app.get("/weather", (req, res) => {
  //To be sent back to user
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geoCode(req.query.address, (error, data) => {
    if (error) return res.send({ error });
    foreCast(data, (error, data) => {
      if (error) return res.send({ error });
      res.send({
        forecast: data.foreCast,
        location: data.place_name,
        address: req.query.address
      });
    });
  });
});

//Error - For 404 Pages - http://localhost:3000/me
app.get("*", (req, res) => {
  //To be sent back to user - rendered from handlebar
  //name of view to match with string in render
  res.render("404-page", {
    errorMsg: "Article not found.",
    title: "404",
    name: "Akash Mishra",
  });
});

//Start the server - with port number and a callback
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

//http://localhost:3000
//http://localhost:3000/help.html
//http://localhost:3000/about.html
