// config.js
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const opener = require('opener');
const socketIO = require('socket.io');
const msToTimecode = require('ms-to-timecode');
const fs = require('fs');
const path = require('path');
const Timecode = require('smpte-timecode')


const frameRate = 50;


// Define configurations as an object instead of using global variables
const config = {
    httpConnected: false,
    paths: {
        aafFilePath: JSON.stringify("../_TallyToAAF/aaf/"),
        avbFilePath: JSON.stringify("../_TallyToAAF/avb/"),
        otioFilePath: JSON.stringify("../_TallyToAAF/otio/")
    },
    ports: {
        htmlPort: 3000,
        listenPort: 9910,
        listenIP: '127.0.0.1'
    },
    tapeNameFilePath: "./data/TallyTapeName.csv",
};

// Initializing Express app and HTTP server here might not be best for a config file.
// You might want to initialize these in the main server file or a dedicated initialization script.
// However, for simplicity, let's keep these here but export them properly.
const app = express();
const htmlServer = http.createServer(app);
const io = socketIO(htmlServer);

function msSinceMidnight(d=null){
	// calculate the number of milliseconds since midnight
	if (d !== null) {
		var e = new Date(d)
	}	
	else{
		var e = new Date()
	}
	return (e.getTime() - e.setHours(0,0,0,0))
}

function timecodeToDatetime(timecode, fps){
  const t = Timecode(timecode, fps=25, false);
  var s = t.frameCount/fps;
  return new Date(s * 1000);
}

function dateTimeToTimecode(d, fps){
  const t = Timecode(d, fps=25, false);
  return t;
}

// Export configurations and modules
module.exports = {
    config,
    express,
    bodyParser,
    app,
    http,
    opener,
    htmlServer,
    io,
    msToTimecode,
    msSinceMidnight,
    frameRate,
    fs,
    path,
    timecodeToDatetime, 
    dateTimeToTimecode,
};