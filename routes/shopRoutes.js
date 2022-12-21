
const path = require('path');
//const { body } = require('express-validator');

const express = require('express');

const shopControllers = require('../controllers/shopControllers');
const checkAuth = require('../middlewares/auth');

const router = express.Router();

// router.use(checkAuth);
// /shop/dashboard => POST
router.post('/create-deal', shopControllers.postCreateDeal);
router.post('/scancode', shopControllers.scanCode);
router.post('/scannedDeal', shopControllers.scannedDeal);
router.put('/updateVisits', shopControllers.updateVisits);
router.post('/claimReward', shopControllers.claimReward);





// /shop/dashboard => GET
router.get('/home',shopControllers.getHome);
router.get('/transactions',shopControllers.getTransactions);
router.post('/logout',shopControllers.getLogout);

// /shop/dashboard => PUT 
router.put('/edit-profile', shopControllers.updateProfile); 
 
module.exports = router;
    