const Product = require('../model/Product')
const { response } = require('express')

const coffee = async(req,res,next)=>{
    Product.find({brand:'coffee'}).then(response=>{
        
        const dataCF = response.map(response => response.toObject())
        // let brand = req.body.brand
        // if(brand=='hello'){
        // res.status(200).json(response)
        // }else{}
        res.render('coffees',{dataCF})
    })
    .catch(error =>{
        res.json({
            message : error
        })
    })
}
const milk = async(req,res,next)=>{
    Product.find({brand:'milk'}).then(response=>{
        
        const dataCF = response.map(response => response.toObject())
        // let brand = req.body.brand
        // if(brand=='hello'){
        // res.status(200).json(response)
        // }else{}
        res.render('milks',{dataCF})
    })
    .catch(error =>{
        res.json({
            message : error
        })
    })
}
const cake = async(req,res,next)=>{
    Product.find({brand:'cake'}).then(response=>{
        
        const dataCF = response.map(response => response.toObject())
        // let brand = req.body.brand
        // if(brand=='hello'){
        // res.status(200).json(response)
        // }else{}
        res.render('cakes',{dataCF})
    })
    .catch(error =>{
        res.json({
            message : error
        })
    })
}
const juice = async(req,res,next)=>{
    Product.find({brand:'juice'}).then(response=>{
        
        const dataCF = response.map(response => response.toObject())
        // let brand = req.body.brand
        // if(brand=='hello'){
        // res.status(200).json(response)
        // }else{}
        res.render('juices',{dataCF})
    })
    .catch(error =>{
        res.json({
            message : error
        })
    })
}
// const index = async(req,res,next)=>{
//     const brand = req.body.brand
//     if(brand==='hello'){
//         Product.find({brand:'hello'})
//         .then(response => {
//             const dataCF = response.map(response => response.toObject())
//             res.render('coffees',{dataCF})
//         })
//         .catch(error=>{
//             res.json({
//                 message:error
//             })
//         })
//     }else{
//         // res.render(error)
//     }
// }
const show = async(req,res,next)=>{
    let name = req.body.name
    Product.findOne(name)
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
    let coffee = new Product({
        name: req.body.name,
        brand:req.body.brand,
        price:req.body.price,
        description:req.body.description,
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
coffee,show,add,milk,cake,juice
}