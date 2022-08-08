const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}))

const Sequelize = require('sequelize');
const sequelize = require('./util/database');
const User = require('./models/users');
const Parcel = require('./models/parcel');
const Packets = require('./models/packets');
const Payments = require('./models/payments');
const Feedback = require('./models/feedback');



  

const adminRoutes = require('./routes/authroute');
const parcelRoutes = require('./routes/parcelroute');
const orderHistory = require('./routes/orderhistory');


/*
app.use((req, res, next) => {
    User.findById(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

*/
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  app.use((req, res, next) => {
    User.findOne({
      where: { id:1 }
    })
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
    
  app.use('/auth', adminRoutes);
  app.use('/parcel',parcelRoutes);
  app.use('/orderhistory',orderHistory);


  app.use((error, req, res, next) => { 
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });
 
//Packets.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Packets);
User.hasMany(Payments);
//Payments.belongsTo(User);
//Payments.belongsTo(Packets);
Packets.hasOne(Payments); 
 
 //  sequelize.sync({ force: true })
 sequelize.sync()
  .then(result => {
    //return User.findById(1);
     console.log(result);   
     app.listen(8080);
 
  })  
  .catch(err => {
    console.log(err); 
  });
 

   