const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ingredientSchema = new Schema({
    nutrition: String
},{
    timestamps:true
})

var Ingredient = mongoose.model('Ingredient',ingredientSchema) 

module.exports = Ingredient