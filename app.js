var express = require('express');
var app = module.exports = express();
var mongoose = require("mongoose");

var SocketServer = require("ws").Server; 
var wss = new SocketServer({port: 4000});

require("./db/db.js")

var TrafficIncidents = mongoose.model("TrafficIncident"); 

app.get("/", function(req, res){

	var x = req.query.lon || 0; 
	var y = req.query.lat || 0; 

	var loc = {
		type: 'Point',
			//Must be in X,Y (or lon, lat)
		coordinates: [Number(x), Number(y)]
	};
	
	TrafficIncidents.geoNear(loc.coordinates, {maxDistance: metersToRadian(1), spherical:true}, function(err, results, stats){
		if(err){
			res.json(err); 
		}else{
			res.json(results); 
		}		
	}); 
}); 

wss.on('connection', function(ws){
	console.log("Connected")
	ws.on("message", function(m){
		var msg = JSON.parse(m); 
		if(msg.from_watch){
			TrafficIncidents.geoNear(msg.pos, {maxDistance: metersToRadian(1), spherical:true}, function(err, results, stats){
				if(err){
					var response = {
						from_server: true, 
						from_watch: false, 
						error: err
					}
					ws.send(JSON.stringify(response)); 
				}else{
					var response = {
						from_server: true, 
						from_watch: false, 
						trafficIncident: results[0], 
					}; 
					ws.send(JSON.stringify(response)); 
				}		
			}); 			
		}	
	}); 
}); 

function metersToRadian(km){
    return km/6371;
}

app.listen(3000, function(){
	console.log("Started server"); 
}); 