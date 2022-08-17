
const path = require('path');
//const { body } = require('express-validator');

const express = require('express');

const shopControllers = require('../controllers/shopControllers');

const router = express.Router();

// /shop/dashboard => POST
router.post('/create-deal', shopControllers.postCreateDeal);
router.post('/scan-deal', shopControllers.postScanDeal);


// /shop/dashboard => GET
router.get('/home',shopControllers.getHome);
router.get('/transactions',shopControllers.getTransactions);
router.get('/logout',shopControllers.getLogout);

// /shop/dashboard => PUT 
router.put('/edit-profile', shopControllers.putEditProfile); 
 
module.exports = router;
    