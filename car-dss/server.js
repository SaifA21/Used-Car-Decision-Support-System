let mysql = require('mysql');
let config = require('./config.js');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
const cors = require('cors');


const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.use(cors());

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
		const insertedId = results.insertId;
		res.status(201).json({ id: insertedId });

	});


	connection.end();
});



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


app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server