var mongoose = require('mongoose');

var config = require("../config.json");

var db_url = config.db.path + config.db.username + ":" + config.db.password +
    config.db.endpoint;

mongoose.connect(db_url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));

db.once('open', function() {
    console.log("Connected to remote MongoDB");
});

// Load up models
require("./models/TrafficIncidentModel.js"); 