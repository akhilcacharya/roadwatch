var mongoose = require('mongoose');

var path = "../data/";

var csv = require('./csvreader');

require("../db/db.js")


var TrafficIncident = mongoose.model("TrafficIncident"); 

var bumps = csv(path + "Speed_Humps.csv");

var index = 0; 

bumps.forEach(function(bump) {
    var newB = new TrafficIncident({
		type: 0,
        id: bump.objectid + (index++),
        loc: {
            type: "Point",
            coordinates: [Number(bump.x), Number(bump.y)]
        },
        address: bump.location,
    });

    newB.save();
})

var cameras = csv(path + "Speed_Camera.csv");
cameras.forEach(function(camera) {
    var newC = new TrafficIncident({
		type: 1, 
        id: camera.objectid + (index++),
        loc: {
            type: "Point",
            coordinates: [Number(camera.x), Number(camera.y)]
        },
        speed_limit: camera.speed_limit,
        address: camera.address,
    });

    newC.save();
});


var detector = csv(path + "Speed_Detector.csv");
detector.forEach(function(detector) {
    var newD = new TrafficIncident({
		type: 2, 
        id: detector.objectid, 
        loc: {
            type: "Point",
            coordinates: [Number(detector.x), Number(detector.y)]
        },
        address: detector.roaddir + " " + detector.roadname,
    });

    newD.save(function(err){
		if(err){
			console.log(err)
		}
	});
});
