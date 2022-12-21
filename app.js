const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const ShopProfile = require("./models/shopProfiles");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // application/json


// Import all routes
 const adminRoutes = require('./routes/adminRoutes');
 const shopRoutes = require('./routes/shopRoutes'); 
 const customerRoutes = require('./routes/customerRoutes');
 const authRoutes = require('./routes/authRoutes');


 app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use((req, res, next) => {
  ShopProfile.findById('6366199945bdb8bf038e27b9')
    .then(shop => {
      req.shop = shop;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/auth',authRoutes);
app.use('/shop/dashboard', shopRoutes); 
app.use('/customer/dashboard',customerRoutes);
app.use('/admin/dashboard',adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "DB CONNECTION CREDENTIALS",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("db connected"))
  .catch((e) => {
    console.log(e);
  });


app.listen(4000, () => {
  console.log("server starts..!");
});
