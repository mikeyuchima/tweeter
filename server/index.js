// "use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path');

app.use('/styles', nodeSassMiddleware({
  src: __dirname + '/../public/styles',
  dest: __dirname + '/../public/styles',
  debug: true,
  outputStyle: 'expanded'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//mongoDB
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  
  app.use("/tweets", tweetsRoutes);
  
  app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
  });
});