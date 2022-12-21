const Customer = require("../models/customerProfiles");
const Enrolls  = require("../models/enrolledDetails");
const Shop = require("../models/shopProfiles");
const CreateDeal = require("../models/createdDeals");



const mongoose = require("mongoose");


/*
module.exports.orderhistory =(req,res,next) => {


   
}

*/
module.exports.detailsDeals =(req,res,next) => {
  const customerID = req.body.customerID;
  const shopID = req.body.shopID;
  const dealID = req.body.dealID;

  Enrolls.find({customerID:customerID,shopID:shopID, dealID:dealID })
  .then((result) => { 
    console.log(result);
  })
  .catch((err) => {
    res.status(500).json({ msg: err });
  });

   
}

module.exports.enrolledList =(req,res,next) => {
const customerName = req.body.customerName;
Enrolls.find({customerName:customerName})
.then((result) => {
  console.log(result);
  res.status(200).json({ msg: result });

})
.catch((err) => {
  res.status(500).json({ msg: err });
});

   
}

module.exports.customerEnroll =(req,res,next) => {
  console.log(req.shop.shopID);
    const shopID = req.body.shopID;
    
     const shopName = "Astore";
    // shopName = req.shop.shopName;
    const customerID = req.body.customerID;
    const customerName = req.body.customerName;
    const dealID = req.body.dealID;
    const dealTitle = req.body.dealTitle;
    const date = new Date(req.body.expiryDate);
    console.log(date);
    const expiryDate = date;
    const visitsDone = 0;
    const requiredVisits = req.body.requiredVisits;
    const dealStatus = "active";
    const rewardClaimed = "Not claimed" ;
   let temp;
    Shop.findOne({shopID:shopID})
    .then(result => {
     
      console.log(result);
    })
    .catch(err =>
      console.log(err)
      );

  const enrolls = new Enrolls({
    shopID: shopID,
    shopName: shopName,
    customerID: customerID,
    customerName: customerName,
    dealID: dealID,
    dealTitle: dealTitle,
    expiryDate: expiryDate,
    visitsDone: visitsDone,
    requiredVisits: requiredVisits,
    dealStatus: dealStatus,
    rewardClaimed: rewardClaimed
  });
  enrolls
    .save()
    .then(res.status(200).json({ enrolls }))
    .catch((err) => {
      res.status(500).json({ msg: err });
    });

   
}


module.exports.getHome =(req,res,next) => {


   
}

module.exports.getShops =(req,res,next) => {
/*
    try{
        const allshop=await Shop.find();
        res.status(200).send(allshop);
        }catch(e){
        res.status(404).send(e);
        }
   */
        Shop.find()
        .then(result => {
            res.status(200).json({result})   
        
        }) 
        .catch(err => 
            {res.status(500).json({msg:err})}
            
        )
}

module.exports.getShopDeals =(req,res,next) => {
  shopID = req.shop.shopID;
  console.log(shopID);

  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd ;
console.log(today);

  currentDate = new Date(today)
  console.log(currentDate)
  CreateDeal.find({ currentDate : { $lt: CreateDeal.expiryDate}} )
  .then((result) => {
   // console.log(result);
  })
  .catch((err) => {
    res.status(500).json({ msg: err });
  });

   
}



module.exports.getLogout =(req,res,next) => {

    console.log("Logging Out");

   
}

module.exports.putEditProfile =(req,res,next) => {
/*
    try{
        const influencer=await Influencer.create(req.body);
        res.status(200).json({influencer})
       }catch(err){
        res.status(500).json({msg:err});
       }
  */
 
       
       console.log(req.body);

    const username = req.body.username;
    const  email = req.body.email;
    const  mobile  = req.body.mobile;
    const  description=req.body.description;
    const  pincode = req.body.pincode;
    const  password= req.body.password;
    const   code = req.body.code;
    const customerID = Math.floor(Math.random()*90000) + 10000;

    
    console.log(code);

    const customer = new Customer({
        username:username,
        email:email,
        mobile:mobile,
        pincode:pincode,
        description:description,
        password:password,
        code:code,
        customerID:customerID
   
    });
    customer.save()
    .then(
        res.status(200).json({customer})
    )
    .catch(err =>
        {res.status(500).json({msg:err})}
        
    )
}


module.exports.updateProfile = async (req, res, next) => {
   // const role = req.body.role;
  
   const username = req.body.username;
   const  email = req.body.email;
   const  mobile  = req.body.mobile;
   const  description=req.body.description;
   const  pincode = req.body.pincode;
   const  password= req.body.password;
   const   code = req.body.code;
   const customerID = Math.floor(Math.random()*90000) + 10000;
    //   const { title, description } = req.body;
    //   const placeId = req.params.pid;
  
    let profile;
    try {
      profile = await Customer.findById(userId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update place.",
        500
      );
      return next(error);
    }
  
    if (profile.customerID.toString() !== req.userData.userId) {
      const error = new HttpError("You are not allowed to edit this place.", 401);
      return next(error);
    }
  
    profile.username=username;
    profile.email=email;
    profile.mobile=mobile;
    profile.pincode=pincode;
    profile.description=description;
    profile.password=password;
    profile.code=code;
    profile.customerID=customerID;

    // place.title = title;
    // place.description = description;
  
    try {
      await profile.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update place.",
        500
      );
      return next(error);
    }
  
    res.status(200).json({ profile: profile.toObject({ getters: true }) });
  };
  