const Model = require('../models/food')


function addIngredient(req, res) {
    let { recipe, ingredient } = req.body;
    if(typeof ingredient === String){
        ingredient = [ingredient]
    }else{
        ingredient = ingredient
    }
    Model.create({
        recipe: recipe,
        ingredient: ingredient
    })
        .then(function (data) {
            res.status(201).json({ msg: 'new ingredient added', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'add ingredient failed' })
        })
}

function readAllIngredient(req, res) {
    Model.find({})
    .populate('ingredient')
        .then(function (data) {
            res.status(200).json({ msg: 'data found', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.message })
        })
}

function readOneIngredient(req, res) {
    Model.findOne({ _id: req.params.id })
        .then(function (data) {
            res.status(200).json({ msg: 'data found', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.message })
        })
}

function removeIngredient(req, res) {
    Model.remove({ _id: req.params.id })
        .then(function (data) {
            res.status(201).json({ msg: 'delete ingredient success' })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'delete ingredient failed' })
        })
}

function update(req, res) {
    let { recipe } = req.body
    Model.update(
        {
            _id: req.params.id
        },
        {
            recipe: recipe,
        })
        .then(function (data) {
            res.status(201).json({ msg: 'Edit food success', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'Edit food failed' })
        })
}

module.exports = { addIngredient, readAllIngredient, readOneIngredient, removeIngredient, update }