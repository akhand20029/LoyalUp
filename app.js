const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//  MongoDB PSWD =   hF6kmywb48Ee8Yfj
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // application/json

// import all modules in project needed
//const Sequelize = require('sequelize');

// Import all routes
 const adminRoutes = require('./routes/adminRoutes');
 const shopRoutes = require('./routes/shopRoutes');
 const influencerRoutes = require('./routes/influencerRoutes');


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.use('/shop/dashboard', shopRoutes);
app.use('/influencer/dashboard',influencerRoutes);
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
    "mongodb+srv://Akhand:hF6kmywb48Ee8Yfj@cluster0.wcm7p.mongodb.net/delhyfluencerdb?retryWrites=true&w=majority",
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
