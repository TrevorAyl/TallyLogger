const { uniqueLabelsToColors } = require('./color-mapper');
const { config } = require('../config');

/* CALL Python scripts with arguments */

function writeToAAF(data)	{

	const spawn = require("child_process").spawn;
	const file_path = "/Users/trevoraylward/Documents/GitHub/TallyLogger/writeTallyAAF.py"

	const strData = JSON.stringify(data);
	// console.log(data);
	// console.log(strData);
	
	const strTapeInfo = JSON.stringify(uniqueLabelsToColors(data));
	// console.log(strTapeInfo);


	console.log('output to AAF file:\n')
	// console.log(`file_path: ${file_path} strData: ${strData} config.paths.aafFilePath: ${config.paths.aafFilePath} frameRate: ${frameRate}`)
	const pythonProcess = spawn('python3',[file_path, strData, strTapeInfo, config.paths.aafFilePath, frameRate]);
}

function writeToAVB(data)	{

	const spawn = require("child_process").spawn;
	const file_path = "/Users/trevoraylward/Documents/GitHub/TallyLogger/writeTallyAVB.py"

	const strData = JSON.stringify(data);


	const strTapeInfo = JSON.stringify(uniqueLabelsToColors(data));
	console.log('output to AVB file:\n')

	const pythonProcess = spawn('python3',[file_path, strData, strTapeInfo, config.paths.avbFilePath, frameRate]);
}

function writeToOTIO(data)	{

	const spawn = require("child_process").spawn;
	const file_path = "/Users/trevoraylward/Documents/GitHub/TallyLogger/writeTallyOTIO.py"

	const strData = JSON.stringify(data);

	const strTapeInfo = JSON.stringify(uniqueLabelsToColors(data));
	console.log('output to OTIO file:\n')

	const pythonProcess = spawn('python3',[file_path, strData, strTapeInfo, config.paths.otioFilePath, frameRate]);
}

module.exports = { writeToAAF, writeToAVB, writeToOTIO };
