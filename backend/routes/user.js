const express= require("express");
const { register, login,getUser }  = require('../controllers/User');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/users', getUser);

module.exports=router;