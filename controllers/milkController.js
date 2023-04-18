const Milk = require('../model/Milk')
const { response } = require('express')

const index = async(req,res,next)=>{
    Milk.find().then(response=>{
        const dataCF = response.map(response => response.toObject())
        res.render('milks',{dataCF})
    })
    .catch(error =>{
        res.json({
            message : error
        })
    })
}
const show = async(req,res,next)=>{
    let name = req.body.name
    Milk.findOne(name)
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
    let milk = new Milk({
        name: req.body.name,
        price:req.body.price,
        description:req.body.price,
        image:req.body.image
    })
    milk.save()
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