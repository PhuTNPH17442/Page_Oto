const express = require('express')
const router = express.Router()
const Coffee = require('../controllers/coffeeController')
router.get('/',Coffee.index)
router.post('/add',Coffee.add)

module.exports = router