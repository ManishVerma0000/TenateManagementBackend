const express = require('express')
const router = express.Router();
const upload = require('../middleware/multer')


const { registerTenate, updateTenate } = require('../controllers/registerTenate')
const listoftenate = require('../controllers/listoftenate')
const { listofbuilding, addbuilding } = require('../controllers/addbuilding')






router.post('/addbuilding', addbuilding)
router.get('/listofbuilding', listofbuilding)
router.post('/registertenate', upload, registerTenate)
router.get('/list', listoftenate)

module.exports = router

