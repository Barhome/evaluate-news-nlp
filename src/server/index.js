//settin up environment variable  
const dotenv = require('dotenv');
dotenv.config();

// declare api credentials for setting up  environment variable  
const application_key = process.env.API_KEY;

const projectData={}
let userUrl=''
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch')

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

// app.get('/test', function (req, res) {
//     res.send(mockAPIResponse)
// })

//create function to return data from sementic analysis api 

const getSementicAnalysis = async function (url = "") {
  const request = await fetch(url);
  try {
    const data = await request.json();
    //console.log(dataApi);
    return data;
  } catch (error) {
    console.log(`error:${error}`);
  }
};

// creating post route for user url

const postUserUrl =  async function (req,res){
    console.log(req.body);
    userUrl=req.body.userUrl;
    const myUrl=`https://api.meaningcloud.com/sentiment-2.1?key=${application_key}&of=json&url=${userUrl}&lang=en`;
    getSementicAnalysis(myUrl).then((data)=>
    {
      console.log(data.score_tag);
      projectData.score_tag=data.score_tag;
      res.send(projectData)
    });
      
}
app.post('/postUserUrl', postUserUrl);

// app.get('/getServerEndPoint', function (req, res) {
//   res.send(projectData)
// })


