const express=require('express');
const database = require('./db');
var cors = require('cors');
const bodyParser = require('body-parser');
const initializeSocketServer = require('./socketServer');
const path=require('path');

const app = express();
app.use(bodyParser.json());


initializeSocketServer();

const PORT= process.env.PORT || 5000;

app.use(cors());

database();
app.get('/',(req,res)=>{
    res.send("Server is working");
})

app.use("/api/user",require("./routes/user"));
app.use("/api/",require("./routes/chat"));
app.use("/api/message",require("./routes/message"));

app.use(express.static(path.join(__dirname,  'build')));


app.listen(PORT, function () {
 
    console.log("App listening at http://localhost:",PORT);
 })
