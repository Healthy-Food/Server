const mongoose = require('mongoose')
const Schema = mongoose.Schema

var foodSchema = new Schema({
    recipe: String,
    ingredient: [{type:Schema.Types.ObjectId, ref:'Ingredient'}],
},{
    timestamps:true
})

var Food = mongoose.model('Food',foodSchema) 

module.exports = Food