const express=require('express');
const database = require('./db');
const http = require('http');
const chatbot=require("./controllers/Gemini");
var cors = require('cors');
const bodyParser = require('body-parser');
const initializeSocketServer = require('./socketServer');

const app = express();
app.use(bodyParser.json());


initializeSocketServer();

const PORT= process.env.PORT || 5000;

app.use(cors());

database();

app.use("/api/user",require("./routes/user"));
app.use("/api/",require("./routes/chat"));
app.use("/api/message",require("./routes/message"));


app.listen(PORT, function () {
 
    console.log("App listening at http://localhost:",PORT);
 })
