const express = require('express')
const router = express.Router()
const Milk = require('../controllers/milkController')
router.get('/',Milk.index)
router.post('/add',Milk.add)

module.exports = router