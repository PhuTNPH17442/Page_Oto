const express = require('express')
const router = express.Router()
const Product = require('../controllers/productController')
router.get('/coffee',Product.coffee)
router.get('/milk',Product.milk)
router.get('/cake',Product.cake)
router.get('/juice',Product.juice)
router.get('/show',Product.show)
router.post('/add',Product.add)

module.exports = router