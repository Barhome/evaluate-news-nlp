var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()


/* Middleware*/
//including body-parser
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
//including cors
const cors = require("cors");
//connecting cors
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)



app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
