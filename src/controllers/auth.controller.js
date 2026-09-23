const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function registerUser(req,res){

    const{username, email, password, role ='user'} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]                //it selects either of them
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists"
        })
    }
    
    const hash = await bcrypt.hash(password,10)
    
    const user = await userModel.create({
        username,
        email,
        password:hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role,  // token k liye ek unique property is enough
    }, process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({
        message: "user registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email:user.email,
            role: user.role,
        }
    })
    //Password is not returned in the API response because it is sensitive data and should never be exposed 
    // to the client, even in hashed form.
}

async function loginUser(req,res){
    const{username,email,password} = req.body;
     const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
     })

     if(!user){
        return res.status(401).json({
            message:"User not found or invalid credentials"
        })
     }
     const isPasswordValid = await bcrypt.compare(password,user.password);
     // bcrypt.compare first converts the password entered by user into hash and then compares 
     // it with the password presend in db

     if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
     }

     const token = jwt.sign({
        id:user._id,
        role:user.role,
     },process.env.JWT_SECRET)

     res.cookie("token",token);

     res.status(200).json({
        message: " User logged in successfully",
        user:{ id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
     })
}
async function logOutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message : "User logged out successfully"
    })
}

module.exports = {registerUser,loginUser,logOutUser};
