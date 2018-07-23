"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

const MongoClient = require("mongodb").MongoClient;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) { 
      db.collection("tweeter").insertOne(newTweet, (err, results) => {
        callback(null, results);
      }); 
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        db.collection("tweeter").find().toArray((err, results) => {
          callback(null, results);
        });
      }
    }
  }