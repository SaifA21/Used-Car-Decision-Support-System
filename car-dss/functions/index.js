
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

app.post('/api/searchResultsAll', (req, res) => {

	let connection = mysql.createConnection(config);
	connection.connect();
	let sql = `SELECT * FROM db.results;`
	console.log(sql)

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		console.log(results)
		let string = JSON.stringify(results)
		console.log(string)
		res.send({ express: string })

	});

	connection.end();
});


app.post('/api/savePurchase', (req, res) => {

	let connection = mysql.createConnection(config);
	connection.connect();
	let sql = `INSERT INTO responses (id, selectedCar) VALUES ('${req.body.id}', '${req.body.selectedCar}');`
	console.log(sql)

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		console.log(results)
		let string = JSON.stringify(results)
		console.log(string)
		res.send({ express: string })

	});

	connection.end();
});



app.post('/api/searchResultById', (req, res) => {

	let connection = mysql.createConnection(config);
	connection.connect();
	let sql = `SELECT * FROM db.results WHERE id = ${req.body.id};`
	console.log(sql)

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		console.log(results)
		let string = JSON.stringify(results)
		console.log(string)
		res.send({ express: string })

	});


	connection.end();
});

app.post('/api/addResults', (req, res) => {

	let connection = mysql.createConnection(config);
	connection.connect();
	let sql =
		`INSERT INTO db.results (
    numCarsSelected,
    yearRange,
    hpScale,
    vehicleStyle,
    mileageScale,
    hwyPercentage,
    drivetrainSelections,
    transmissionTypes,
    fuelTypes,
    car1Result,
    car2Result,
    car3Result,
    car4Result,
    car5Result
)
VALUES (
    ${req.body.numCars},
    '${req.body.yearRange}',
    '${req.body.hpScale}',
    '${req.body.style}',
    '${req.body.mileageScale}',
    '${req.body.hwyPercentage}',
    '${req.body.drivetrain}',
    '${req.body.trans}',
    '${req.body.fuel}',
    '${req.body.car1}',
    '${req.body.car2}',
    '${req.body.car3}',
    '${req.body.car4}',
    '${req.body.car5}'
);`

	console.log(sql)

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		console.log(results)
		let string = JSON.stringify(results)
		console.log(string)
		res.send({ express: string })

	});


	connection.end();
});




exports.app = functions.https.onRequest(app);