const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true, //username is required if not given then db wont create user
        unique: true,   //username should be unique and cannot be same
        },

    email:{
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },

    role : {
        type: String,
        enum : ['user','artist'], //enum btata hai role ki value dono mei se ek hi ho skti h
        default : 'user',
    }
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;