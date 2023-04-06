const Car = require('../model/Cars')
const { response } = require('express')

const index = async(req,res,next)=>{
    Car.find().then(response=>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message : error
        })
    })
}
const show = async(req,res,next)=>{
    let nameCar = req.body.nameCar
    Car.findOne(nameCar)
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
            message : error
        })
    })
}
const add = async(req,res,next)=>{
    
}