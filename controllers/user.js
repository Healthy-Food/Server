const Model = require('../models/user')

function addFood(req, res) {
    let { food } = req.body
    if(typeof food === String){
        food = [food]
    }else{
        food = food
    }
    Model.create({
        food: food
    })
        .then(function (data) {
            res.status(201).json({ msg: 'new food added', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'add food failed' })
        })
}

function readAllFood(req, res) {
    Model.find({})
    .populate('food')
        .then(function (data) {
            res.status(200).json({ msg: 'data found', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.message })
        })
}

function readOneFood(req, res) {
    Model.findOne({ _id: req.params.id })
        .then(function (data) {
            res.status(200).json({ msg: 'data found', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.message })
        })
}

function removeFood(req, res) {
    Model.remove({ _id: req.params.id })
        .then(function (data) {
            res.status(201).json({ msg: 'delete food success' })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'delete food failed' })
        })
}

function update(req, res) {
    let { username } = req.body
    Model.update(
        {
            _id: req.params.id
        },
        {
            username: username,
        })
        .then(function (data) {
            res.status(201).json({ msg: 'Edit user success', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'Edit user failed' })
        })
}



module.exports = { addFood, readAllFood, readOneFood,removeFood,update }