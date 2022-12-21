const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// store-customer-deal-deal status
const EnrollSchema= new mongoose.Schema({
  shopID:{type:Number,required:true},
  shopName:{type:String,required:true},
  customerID:{type:Schema.Types.ObjectId,required:true},
  customerName:{type:String,required:true},
  dealID:{type:Schema.Types.ObjectId,required:true},
  dealTitle:{type:String,required:true},
  expiryDate:{type:Date,required:true},
  visitsDone:{type:Number,required:true},
  requiredVisits:{type:Number,required:true},
  dealStatus:{type:String,required:true},
  rewardClaimed:{type:String,required:true}

  
  
},{timestamps:true})

//export const Transaction=mongoose.model("Transaction",TransactionSchema);
module.exports = mongoose.model("enrolledDetails",EnrollSchema);