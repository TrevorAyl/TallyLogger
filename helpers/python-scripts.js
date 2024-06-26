// python-scripts.js
// call to python scripts that work with pyAAF and pyAVB libraries

const { uniqueLabelsToColors } = require('./color-mapper');
const { config, frameRate } = require('../config');
const spawn = require("child_process").spawn;

/* CALL Python scripts with arguments */
/* writing it for standard in instead of arguments */

async function writeToAAF(data)	{
	// console.log('writeToAAF:', data);

	const file_path = "/Users/trevoraylward/Documents/GitHub/TallyLogger/writeTallyAAF.py"
	const pythonProcess = spawn('python3', [file_path, config.paths.aafFilePath, frameRate]);
	const tapeInfo = await uniqueLabelsToColors(data);

	// Convert data to string and write to standard input of the Python process
	const strData = JSON.stringify({ data, tapeInfo });
	pythonProcess.stdin.write(strData);
	pythonProcess.stdin.end();

	// Handle output and errors
	pythonProcess.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});
	pythonProcess.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

}

async function writeToAVB(data)	{

	const file_path = "/Users/trevoraylward/Documents/GitHub/TallyLogger/writeTallyAVB.py"
	const pythonProcess = spawn('python3', [file_path, config.paths.avbFilePath, frameRate]);
	const tapeInfo = await uniqueLabelsToColors(data);
	
	// Convert data to string and write to standard input of the Python process
	const strData = JSON.stringify({ data, tapeInfo });
	pythonProcess.stdin.write(strData);
	pythonProcess.stdin.end();

	// Handle output and errors
	pythonProcess.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});
	pythonProcess.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

}

async function writeToOTIO(data)	{

	const file_path = "/Users/trevoraylward/Documents/GitHub/TallyLogger/writeTallyOTIO.py"
	const pythonProcess = spawn('python3',[file_path, config.paths.otioFilePath, frameRate]);
	const tapeInfo = await uniqueLabelsToColors(data);
	
	// Handle output and errors
	pythonProcess.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});
	pythonProcess.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

}

module.exports = { writeToAAF, writeToAVB, writeToOTIO };
