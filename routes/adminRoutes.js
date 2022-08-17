
const path = require('path');
//const { body } = require('express-validator');

const express = require('express');

const adminControllers = require('../controllers/adminControllers');

const router = express.Router();

// /admin/dashboard => POST
//router.post('/create-deal', shopControllers.postCreateDeal);


// /admin/dashboard => GET
router.get('/shops',adminControllers.getShops);
router.get('/influencers',adminControllers.getInfluencers);
router.get('/deals',adminControllers.getDeals);
router.get('/shopId',adminControllers.getShopID);
router.get('logout',adminControllers.getLogout);

// /admin/dashboard => PUT 
//router.put('/edit-profile', shopControllers.putEditProfile); 
 
module.exports = router;
    