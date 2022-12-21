//const Packets = require("../models/packets");

const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Shop = require("../models/shopProfiles");
const Customer = require("../models/customerProfiles");

module.exports.shopSignUp = async (req, res, next) => {
/*
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
*/
  // const role = req.body.role;
  const emailID = req.body.email;
  let existingUser;
  try {
    existingUser = await Shop.findOne({ email: emailID});
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(err);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  /*
        const createdUser = new User({
          name,
          email,
          image: req.file.path,
          password: hashedPassword,
          places: []
        });
        */
  const shopName = req.body.shopName;
  const shopOwnerName = req.body.shopOwnerName;
  const email = req.body.email;
  const shopMobile = req.body.shopMobile;
  const shopPincode = req.body.shopPincode;
  const password = req.body.password; 
  const description = req.body.description;
  const address = req.body.address;
  const category = req.body.category;
  const timing = req.body.timing;
  const shopID = Math.floor(Math.random() * 90000) + 10000;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(err);
  }

  console.log(shopID);

  const createdShop = new Shop({
    shopName: shopName,
    shopOwnerName: shopOwnerName,
    email: email,
    shopMobile: shopMobile,
    shopPincode: shopPincode,
    password: hashedPassword,
    description: description,
    address: address,
    category: category,
    timing: timing,
    shopID: shopID,
  });

  try {
    await createdShop.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdShop.id, email: createdShop.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdShop.id,
    email: createdShop.email,
    token: token,
  });
}
  module.exports.customerSignUp = async (req, res, next) => {
    const emailId = req.body.email;

    let existingUser;
    try {
      existingUser = await Customer.findOne({ email: emailId });
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(err);
    }

    if (existingUser) {
      const error = new HttpError(
        "User exists already, please login instead.",
        422
      );
      return next(error);
    }

    const username = req.body.username;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const description = req.body.description;
    const pincode = req.body.pincode;
    const password = req.body.password;
    const code = req.body.code;
    const customerID = Math.floor(Math.random() * 90000) + 10000;

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError(
        "Could not create user, please try again.",
        500
      );
      return next(error);
    }

    console.log(code);

    const createCustomer = new Customer({
      username: username,
      email: email,
      mobile: mobile,
      pincode: pincode,
      description: description,
      password: hashedPassword,
      code: code,
      customerID: customerID,
    });

    try {
      await createCustomer.save();
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }

    let token;
    try {
      token = jwt.sign(
        { userId: createCustomer.id, email: createCustomer.email },
        "supersecret_dont_share",
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }

    res.status(201).json({
      userId: createCustomer.id,
      email: createCustomer.email,
      token: token,
    });
  };


module.exports.SignIn = async (req, res, next) => {
  const { email, password, role } = req.body;
  let User;
  if (role == "shop") {
    User = require("../models/shopProfiles");
  } else if ((role == "customer")) {
    User = require("../models/customerProfiles");
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(err);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in. - No user with this email",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you innnnnnnnnnnnnnnn. - wrong password",
      403
    );
    return next(error);
  } 

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "SECRET KEY",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email, 
    token: token,
  });
};

