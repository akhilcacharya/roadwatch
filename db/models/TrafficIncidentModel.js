var mongoose = require('mongoose');

var trafficIncidentSchema = mongoose.Schema({
	type: Number, //Enum - 0 for hump, 1 for cameras, 2 for detector 
    id: {
        type: Number,
        index: true,
        unique: true,
    },
    loc: {
        type: {
            type: String
        },
        coordinates: [Number],
    },
    address: String,
	speed_limit: Number,
});

trafficIncidentSchema.index({
    "loc.coordinates": "2d"
});


mongoose.model("TrafficIncident", trafficIncidentSchema);
