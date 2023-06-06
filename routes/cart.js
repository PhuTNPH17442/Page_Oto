const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

router.post('/add',cartController.add)
router.get('/getUserCartMiddleware',cartController.getUserCartMiddleware)

module.exports = router