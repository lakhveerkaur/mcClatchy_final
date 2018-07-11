const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  http = require("http"),
  app = express();


//api file for interacting with mongodb
const api = require('./server/routes/loki.js');

//Parser to get the request response
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://facebookapp.cfapps.io');
  //  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3003');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//Angular dist output folder to serve all static files
app.use(express.static(path.join(__dirname,'dist/app-v6')));


app.use('/',(req, res, next) => {
  console.log('inside routes');
  next();
}, api);



// Send all other requests to Angular app
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/app-v6/index.html'));
});

const  PORT = process.env.PORT || 3000

app.set('port',PORT);

const server = http.createServer(app);

server.listen(PORT,() => console.log(`Running on localhost:${PORT}`));
