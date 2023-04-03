const express = require("express");
const cors = require("cors");
const passport = require('passport')
const session = require("express-session");

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();
const PORT = process.env.PORT

// Create the Express application
var app = express();


// Must first load the models
require("./config/conn");
require("./models/db");

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
// app.use(
//     session({
//       resave: true,
//       saveUninitialized: true,
//       secret: "this should be a good session",
//     })
//   );
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Allows our Angular application to make HTTP requests to Express application
app.use(cors());

// Imports all of the routes from ./controllers/index.js
require("./controllers/index")(app);

app.get('/', function (req, res) {
    res.send('Page under construction.');
});

// Server listens on http://localhost:3000
app.listen(PORT, () => {
    console.log("Server is active on port ", PORT);
});