const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
    nameCar: {
    type: String,
    required: true,
  },
  brand: {
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
  seatingCapacity: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
},{timestamps:true});

const Car = mongoose.model('Car',carSchema)
module.exports = Car