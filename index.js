const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const moment = require("moment");
var cors = require("cors");
const app = express();

// cors middleware
app.use(cors());


//port no.
const PORT = process.env.PORT || 8000;


//dot env config
dotenv.config({ path: "./config.env" });



//database
require("./db/conn");

//middlewares

//* paths
const staticPath = path.join(__dirname + "/public");
const templetesPath = path.join(__dirname + "/templates/views");
const partialsPath = path.join(__dirname + "/templates/partials");


//* registering partials ~hbs
hbs.registerPartials(partialsPath);
hbs.registerHelper("dateFormat", function (date, options) {
  const formatToUse =
    (arguments[1] && arguments[1].hash && arguments[1].hash.format) ||
    "DD/MM/YYYY";
  return moment(date).format(formatToUse);
});



//? defining views path
app.set("views", templetesPath);
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true}))
app.use(express.static(staticPath));
app.use(express.json());
app.use(require("./router/approute"));


//! listening
app.listen(PORT, () => {
  console.log(`started at ${PORT}`);
});