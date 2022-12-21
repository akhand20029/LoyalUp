
const path = require('path');
//const { body } = require('express-validator');

const express = require('express');

const customerControllers = require('../controllers/customerControllers');

const router = express.Router();

// /influencer/dashboard => POST
router.post('/enroll', customerControllers.customerEnroll);
router.post('/enrolledList', customerControllers.enrolledList);
router.post('/detailsDeals', customerControllers.detailsDeals);


// /influencer/dashboard => GET 
router.get('/home',customerControllers.getHome);
router.get('/shops',customerControllers.getShops);
router.get('/deals',customerControllers.getShopDeals);
//router.get('/transactions',customerControllers.getTransactions);
//router.get('/logout',customerControllers.getLogout);


// /influencer/dashboard => PUT 
router.put('/edit-profile', customerControllers.putEditProfile); 
 
module.exports = router;
    