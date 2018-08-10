const Model = require('../models/ingredient')


function addNutrition(req, res) {
    let { nutrition } = req.body
    Model.create({
        nutrition: nutrition,
    })
        .then(function (data) {
            res.status(201).json({ msg: 'new nutrition added', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'add nutrition failed' })
        })
}

function readAllNutrition(req, res) {
    Model.find({})
        .then(function (data) {
            res.status(200).json({ msg: 'data found', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.message })
        })
}

function readOneNutrition(req, res) {
    Model.findOne({ _id: req.params.id })
        .then(function (data) {
            res.status(200).json({ msg: 'data found', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.message })
        })
}

function removeNutrition(req, res) {
    Model.remove({ _id: req.params.id })
        .then(function (data) {
            res.status(201).json({ msg: 'delete nutrition success' })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'delete nutrition failed' })
        })
}

function update(req, res) {
    let { nutrition } = req.body
    Model.update(
        {
            _id: req.params.id
        },
        {
            nutrition: nutrition,
        })
        .then(function (data) {
            res.status(201).json({ msg: 'Edit ingredient success', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'Edit ingredient failed' })
        })
}

module.exports = { addNutrition, readAllNutrition, readOneNutrition, removeNutrition, update }