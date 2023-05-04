const express = require('express')
const Cart = require('../model/Cart')

const add =  async(req,res,next)=>{
    try{
        const{userID,productId, price, quantity} = req.body

        let cart = await Cart.findOne({userId})

        if(!cart){
            cart = new Cart({userId})
            
        }

        const itemIndex = cart.items.findIndex(item => item.productId == productId)

        if(itemIndex === -1 ){
            cart.items.push({productId,price,quantity})
        }else{
            cart.items[itemIndex].quantity += quantity;
        }
         await cart.save()
         res.status(200).json(cart);
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    add
}