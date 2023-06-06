const express = require('express')
const Cart = require('../model/Cart')
const jwt = require('jsonwebtoken')

const add =  async(req,res,next)=>{
    try{
        const{userId,productId, price, quantity} = req.body

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
async function getUserCart(userId) {
    try {
      // Find the cart of the user with the given userId
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      return cart;
    } catch (error) {
      // Handle error
      console.log(error);
      return null;
    }
  }
  
  // Middleware to get user's cart after JWT authentication
  function getUserCartMiddleware(req, res, next) {
    const token = req.headers.authorization; // Get the JWT token from headers
    if (token) {
      // Verify and decode the token to get user's information
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          // Handle error if token is invalid or expired
          console.log(err);
          req.userCart = null;
          next();
        } else {
          // Get the userId from decoded token
          const { userId } = decoded;
          // Get user's cart based on userId
          getUserCart(userId)
            .then(cart => {
              req.userCart = cart; // Assign the user's cart to request object
              next();
            })
            .catch(error => {
              console.log(error);
              req.userCart = null;
              next();
            });
        }
      });
    } else {
      req.userCart = null;
      next();
    }
  }
module.exports = {
    add,getUserCartMiddleware
}