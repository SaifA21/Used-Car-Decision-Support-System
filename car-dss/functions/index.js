
let mysql = require('mysql');
let config = require('./config.js');
const express = require("express");
const bodyParser = require("body-parser");
const functions = require('firebase-functions')

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");



app.post('/api/test', (req, res) => {

	let connection = mysql.createConnection(config);
	connection.connect();
	let sql = `INSERT INTO db.results(numCarsSelected,numDoorsSelected,
    fuelTypeSelected,carBodyStylesSelected,driveTrainSelected,numOfCylindersSelected,
    budgetSelected,carSizeSelected,cityMPG,hwyMPG, car1Result, car2Result, 
    car3Result, car4Result, car5Result)
    VALUES
    ("1","test","test","test","test","test","test","test","test","test","test","test","test","test","test");`

	connection.query(sql, function (error, results, fields) {
		if (error) throw error;
		res.status(200).send(JSON.stringify("Success!"));
		console.log(req.socket.remoteAddress);

	});

	connection.end();
});





exports.app = functions.https.onRequest(app);