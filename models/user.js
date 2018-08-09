const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
    username: String,
    password: String,
    email:String,
    role:String,
    food:[[{type:Schema.Types.ObjectId, ref:'Food'}]]
},{
    timestamps:true
})

var User = mongoose.model('User',userSchema) 

module.exports = User