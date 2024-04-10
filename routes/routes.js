const express = require('express')
const router = express.Router();
const upload = require('../middleware/multer')


const registerTenate = require('../controllers/registerTenate')
const listoftenate = require('../controllers/listoftenate')








router.post('/registertenate', upload, registerTenate)
router.get('/list', listoftenate)

module.exports = router

