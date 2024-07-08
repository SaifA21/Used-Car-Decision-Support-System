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

app.post('/api/test', (req,res) => {

	let connection = mysql.createConnection(config);
	connection.connect();
	let sql = `INSERT INTO db.results(numCarsSelected,numDoorsSelected,
    fuelTypeSelected,carBodyStylesSelected,driveTrainSelected,numOfCylindersSelected,
    budgetSelected,carSizeSelected,cityMPG,hwyMPG, car1Result, car2Result, 
    car3Result, car4Result, car5Result)
    VALUES
    ("1","test","test","test","test","test","test","test","test","test","test","test","test","test","test");`

	connection.query(sql, function (error, results, fields){
		if (error) throw error;
		res.status(200).send(JSON.stringify("Success!"));
		console.log(req.socket.remoteAddress);
		
	});

	connection.end();
});





app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '129.97.25.211'); //for the deployed version, specify the IP address of the server