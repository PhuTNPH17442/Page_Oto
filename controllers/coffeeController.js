const Coffee = require('../model/Coffee')
const { response } = require('express')

const index = async(req,res,next)=>{
    Coffee.find().then(response=>{
        const dataCF = response.map(response => response.toObject())
        res.render('coffees',{dataCF})
    })
    .catch(error =>{
        res.json({
            message : error
        })
    })
}
const show = async(req,res,next)=>{
    let name = req.body.name
    Coffee.findOne(name)
    .then(response=>{
        res.status(200).json(response)
        
    })
    .catch(error=>{
        res.json({
            message : error
        })
    })
}
const add = async(req,res,next)=>{
    let coffee = new Coffee({
        name: req.body.name,
        brand:req.body.brand,
        price:req.body.price,
        description:req.body.price,
        image:req.body.image
    })
    coffee.save()
    .then(response=>{
        res.json({
            message:'add successful'
        })
    })
    .catch(error=>{
        res.json({
            message:error
        })
    })
}

module.exports ={
index,show,add
}