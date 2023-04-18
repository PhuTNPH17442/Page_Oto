const mongoose = require('mongoose')
const Schema = mongoose.Schema

const milkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
},{timestamps:true});

const Milk = mongoose.model('Milk',milkSchema)
module.exports = Milk