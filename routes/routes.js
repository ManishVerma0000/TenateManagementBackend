const express = require('express')
const router = express.Router();
const upload = require('../middleware/multer')


const { registerTenate, updateTenate } = require('../controllers/registerTenate')
const listoftenate = require('../controllers/listoftenate')
const { listofbuilding, addbuilding } = require('../controllers/addbuilding')
const { registerAdmin, loginadmin, changepassword, forgetPassword } = require('../controllers/registeradmin')
const findAvailableRoom = require('../controllers/findAviableroom')
const addharCardVerification = require('../controllers/addharCardVerification')
const { totalBill, pendingBill, updatePaymentsuccess, makepayementpending, completedPayement } = require('../controllers/rent')

router.post('/forgetPassword', forgetPassword)
router.post('/changepassword', changepassword)
router.get('/makepayementpending', makepayementpending)
router.get('/updatePayment', updatePaymentsuccess)
router.get('/completedPayement', completedPayement)
router.get('/pendingBill', pendingBill)
router.get('/totalBill', totalBill)
router.post('/addharCardVerification', addharCardVerification)
router.post('/findAvailableRoom', findAvailableRoom)
router.post('/login', loginadmin)
router.post('/register', registerAdmin)
router.post('/addbuilding', addbuilding)
router.get('/listofbuilding', listofbuilding)
router.post('/registertenate', registerTenate)
router.get('/list', listoftenate)

module.exports = router

