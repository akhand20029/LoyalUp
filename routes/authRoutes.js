
const path = require('path');
//const { body } = require('express-validator');

const express = require('express');

const authControllers = require('../controllers/authControllers');

const router = express.Router();


// /auth => POST
router.post('/shop/signUp', authControllers.shopSignUp);
router.post('/customer/signUp',authControllers.customerSignUp);
router.post('/signIn', authControllers.SignIn  );
  
// /admin/dashboard => PUT 
//router.put('/edit-profile', shopControllers.putEditProfile); 
 
module.exports = router;
    