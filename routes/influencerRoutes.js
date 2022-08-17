
const path = require('path');
//const { body } = require('express-validator');

const express = require('express');

const influencerControllers = require('../controllers/influencerControllers');

const router = express.Router();

// /influencer/dashboard => POST
//router.post('/create-deal', influencerControllers.postCreateDeal);


// /influencer/dashboard => GET
router.get('/home',influencerControllers.getHome);
router.get('/shops',influencerControllers.getShops);
router.get('/:shopID',influencerControllers.getShopID);
router.get('/transactions',influencerControllers.getTransactions);
router.get('/logout',influencerControllers.getLogout);


// /influencer/dashboard => PUT 
router.put('/edit-profile', influencerControllers.putEditProfile); 
 
module.exports = router;
    