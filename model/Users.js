const mongoose = require('mongoose')
const Schema = mongoose.Schema

 const userSchema  = new Schema({
    name: {type: String, unique: true,  index: true},
    email: {type: String,  unique: true, index: true},
    password:{type:String},
    phone:{type:Number, unique:true,index:true},
    adress:{type:String}
    
 },{timestamps:true})

 const User = mongoose.model('User',userSchema)
 module.exports = User