const User = require('../modals/User.js');
const jwt=require('jsonwebtoken');
const JWT_SECRET = require('../jwtSecret.js');  
const bcrypt=require('bcryptjs');


//  Create user (Sign in)

const register = async (req, res) => {
   
   
    try{

    
    console.log(req.body);
    let user=await User.findOne({email:req.body.email});
    
    if(user){
        return res.status(400).json("Email id already exist");
    }
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
  
    user = await   User.create({
        email:req.body.email,
        password: secPass,
        online:req.body.status,
      })
      
      console.log(user);
      return res.status(200).json("success");
    
    }
    catch(errors){
        console.error(errors.message);
      return  res.status(500).json("User not created");
    }
 
}


// Login user 

const login = async (req, res) => {
 
  
    try{
  
      const {email,password}=req.body;
      
    let user=await User.findOne({email});
    if(!user){
      return res.json("Wrong credentials");}
  
      let passcmp= await bcrypt.compare(password,user.password);
      if(!passcmp){
        return res.json("Wrong credentials");
      }
      const userID=user._id; 
      const data={
        user:{
          id: user._id
        }
      }
      var token = jwt.sign(data, JWT_SECRET);
    
    return res.status(200).json({ success: true, userID }); 
     
    }
    catch(errors){
        console.error(errors.message);
        res.status(500).json("Some error found");
    }
  
  }
  

// Get all users
const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Failed to fetch users");
    }
};

module.exports={register, login, getUser};
