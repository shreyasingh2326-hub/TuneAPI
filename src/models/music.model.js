const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    uri:{
        type:"String",
        required: true,
    },  //song ki location or link

    title:{
        type:"String",
        required:true,
    },  // song title
    artist:{
        type: mongoose.Schema.Types.ObjectId, //artist mei mongoDB _id store krni h name k jagah ye use krenge qki name can change in future but id will be same
        ref:"user",
        required : true
    }

})

const musicModel = mongoose.model('music',musicSchema);

module.exports = musicModel;