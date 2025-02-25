const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = new mongoose.model('admin',adminSchema)