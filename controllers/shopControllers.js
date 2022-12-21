const CreateDeal = require("../models/createdDeals");
const Enrolls = require("../models/enrolledDetails");
const CurrentDeals = require("../models/currentDeals");
const Shop = require("../models/shopProfiles");
const Customers = require("../models/customerProfiles");
const HttpError = require("../models/http-error");


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
module.exports.orderhistory =(req,res,next) => {


   
}

*/
module.exports.claimReward =(req,res,next) => {


   
}

module.exports.scanCode =(req,res,next) => {
  const customerName = req.body.customerName;
  const shopName = req.body.shopName;

  Enrolls.find({shopName : shopName, customerName:customerName,dealStatus:"active"})
    .then((result) => {
      console.log(result);
      res.status(200).json({ msg: result });

    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });


   
}
module.exports.scannedDeal =(req,res,next) => {

  const customerName = req.body.customerName;
  const shopName = req.body.shopName;
  const dealID = req.body.dealID;

  Enrolls.find({shopName : shopName, customerName:customerName,dealID:dealID})
    .then((result) => {
      console.log(result);
      res.status(200).json({ msg: result });

    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
   
}
module.exports.updateVisits =async (req,res,next) => {
  const customerName = req.body.customerName;
  const shopName = req.body.shopName;
  const dealID = req.body.dealID;
/*
  Enrolls.find({shopName : shopName, customerName:customerName,dealID:dealID})
    .then((result) => {
      let visitsDone = result[0].visitsDone;
      let requiredVisits = result[0].requiredVisits;
      if ( visitsDone < requiredVisits) {
        visitsDone++;
      }
      else {
        res.status(500).json({ msg: "Not allowed" });

      }


      console.log(visitsDone);

      res.status(200).json({ visitsDone: visitsDone,
        requiredVisits:requiredVisits });

    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
*/   
const cust =  await Enrolls.findOne({shopName : shopName, customerName:customerName,dealID:dealID});
console.log(cust);
let visitsDone = cust.visitsDone;
let requiredVisits = cust.requiredVisits;
if ( visitsDone < requiredVisits) {
      cust.visitsDone++;
        await cust.save();
        res.status(200).json({cust });

  
    }
    else {
      res.status(200).json({ msg: " Claime Your reward" });

    }
  
  }

module.exports.postCreateDeal = async (req, res, next) => {
  console.log(req.body);

  const dealTitle = req.body.dealTitle;
  const requiredVisits = req.body.requiredVisits;
  const date = new Date(req.body.expiryDate);
  console.log(date);
/*
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();
  
  today = yyyy + '-' + mm + '-' + dd;
  console.log(today);
*/
  const expiryDate = date;
  const reward = req.body.reward;
  const dealStatus = "active"

  console.log(reward);

  const createDeal = new CreateDeal({
    dealTitle: dealTitle,
    requiredVisits: requiredVisits,
    expiryDate: expiryDate,
    reward: reward,
    dealStatus:dealStatus,
    shopID: req.shop.shopID,
  });
  /*
  // await transaction.save()
  // await transaction.save()
 // const deal = await CreateDeal.create(createDeal);
 // console.log(deal);
 // dealID = deal._id;
 // const currentDeal = new CurrentDeals({
 //   storeID: req.shop.shopID,
 //   dealID: dealID,
 // });
  currentDeal
    .save()
    .then(() => {
      // const currentDeal = new CurrentDeals({
      //     storeID: "Aggarwal",
      //     dealID : dealID
      // });
      // currentDeal.save()
      console.log(currentDeal);
      res.status(200).json({ currentDeal });
    })

    .catch((err) => {
      res.status(500).json({ msg: err });
    });

  //request = req.body;
  //res.json({msg : "success"})
  */
  createDeal
  .save()
  .then(res.status(200).json({ createDeal }))
  .catch((err) => {
    res.status(500).json({ msg: err });
  });
};

module.exports.postScanDeal = (req, res, next) => {
  console.log(req.body);

  const customerName = req.body.customerName;
  const customerMobile = req.body.customerMobile;
  const orderValue = req.body.orderValue;
  const netBillAmount = req.body.netBillAmount;
  // const  discount = req.body.discount;
  const influencerShare = req.body.influencerShare;
  const totalAmount = req.body.totalAmount;
  const influencerCode = req.body.influencerCode;
  const paymentStatus = req.body.paymentStatus;
  const shopID = req.shop.shopID;
  const shopName = req.shop.storeName;
  const username = req.body.username;
  const dealID = req.body.dealID;
  const customerShare = req.body.customerShare;

  console.log(shopName);

  const transaction = new Transactions({
    customerName: customerName,
    customerMobile: customerMobile,
    orderValue: orderValue,
    netBillAmount: netBillAmount,
    influencerShare: influencerShare,
    totalAmount: totalAmount,
    influencerCode: influencerCode,
    paymentStatus: paymentStatus,
    shopID: shopID,
    shopName: shopName,
    username: username,
    dealID: dealID,
    customerShare: customerShare,
  });
  transaction
    .save()
    .then(res.status(200).json({ transaction }))
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
};

module.exports.getHome = (req, res, next) => {
  /*

Store :-
Total no of referrals
Unique Influencers
‘Top 10 influencers
Total deal size
Current deal going on
Some profile info
Pending payments to influencers
Previous deals created

*/
  // Total no of referrals

  Transactions.find({ customerName: "Akhand" })
    .then((result) => {
      console.log(result.length);
    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });

  //Unique Influencers
  Transactions.find()
    .distinct("customerName")
    .then((result) => {
      console.log(result.length);
    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });

  // Total deal size
};

module.exports.getTransactions = (req, res, next) => {
  Transactions.find({ shopID: req.shop.shopID })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
};

module.exports.getLogout = (req, res, next) => {
  const date = new Date(req.body.expiryDate);
  console.log(date);
  
};

module.exports.putEditProfile = (req, res, next) => {
  /*
    try{
        const shop=await Shop.create(req.body);
        res.status(200).json({shop})
       }catch(err){
        res.status(500).json({msg:err});
       }
*/
  console.log(req.body);

  const storeName = req.body.storeName;
  const storeOwnerName = req.body.storeOwnerName;
  const storeEmail = req.body.storeEmail;
  const storeMobile = req.body.storeMobile;
  const storePincode = req.body.storePincode;
  const password = req.body.password;
  const description = req.body.description;
  const address = req.body.address;
  const category = req.body.category;
  const timing = req.body.timing;
  const shopID = Math.floor(Math.random() * 90000) + 10000;
  console.log(shopID);

  const shop = new Shop({  
    storeName: storeName,
    storeOwnerName: storeOwnerName,
    storeEmail: storeEmail,
    storeMobile: storeMobile,
    storePincode: storePincode,
    password: password,
    description: description,
    address: address,
    category: category,
    timing: timing,
    shopID: shopID,
  });
  shop
    .save()
    .then(res.status(200).json({ shop }))
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
};

module.exports.updateProfile = async (req, res, next) => {
 // const role = req.body.role;

  const storeName = req.body.storeName; 
  const storeOwnerName = req.body.storeOwnerName;  
  const email = req.body.email;
  const storeMobile = req.body.storeMobile;
  const storePincode = req.body.storePincode;
  const password = req.body.password;
  const description = req.body.description;
  const address = req.body.address;
  const category = req.body.category;
  const timing = req.body.timing;
   //const shopID = req.body.shopID;
  //   const { title, description } = req.body;
  //   const placeId = req.params.pid;

  let profile;
  try {
    profile = await Shop.findOne({email : email});
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place. - at finding profile",
      500
    );
    return next(error); 
  }

  if (profile.email !== req.body.email) {
    const error = new HttpError("You are not allowed to edit this place.", 401);
    return next(error);
  }

  profile.storeName = storeName;
  profile.storeOwnerName = storeOwnerName;
  profile.email = email;
  profile.storeMobile = storeMobile;
  profile.storePincode = storePincode;
  profile.password = password;
  profile.description = description;
  profile.address = address;
  profile.category = category;
  profile.timing = timing;
 // profile.shopID = shopID;

  // place.title = title;
  // place.description = description;

  try {
    await profile.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place. - at time of updating in database",
      500
    );
    return next(error);
  }

  res.status(200).json({ profile: profile.toObject({ getters: true }) });
};
