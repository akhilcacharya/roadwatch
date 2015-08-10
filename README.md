#Roadwatch
Node.js backend for a Pebble app to provide haptic feedback for "road events" in the DC area. Designed to keep your eyes watching the road, and not your smartphone.

Road events may include -

* Red light cameras
* Speed cameras
* Speed detectors
* Speed humps

Built at Bitcamp Spring 2015 by me (akhilcacharya@gmail.com) and Sean Freemerman (who doesn't want his email listed). I built the server side components, he built the client.

We used the DC open data portal for location information - http://opendata.dc.gov/

##Stack
Server: MongoDB, Node.js

Client: PebbleJS, exists somewhere in the clouds.

The app makes special use of Mongo's GIS capabilities - my favorite feature by far. 

##Getting Started
Clone the repository, and add Mongo credentials to config.example.json. Then, rename it to config.json.

Run by executing

    node app.js

##License
MIT
