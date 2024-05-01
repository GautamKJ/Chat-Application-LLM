const mongoose= require('mongoose');
require('dotenv').config();
const newrul=process.env.Database;

const database= ()=>{
     mongoose.connect(newrul).then(
        ()=>{
        console.log("Database connected........");
    })
    .catch((err) =>{
        console.log("No connection");
    })   
}

module.exports=database;