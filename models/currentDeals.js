//import mongoose from 'mongoose';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CurrentDeal= new mongoose.Schema({
   storeID:{type:Number,required:true},
   dealID:{type:String,required:true}
   
  // promotionalImage:{type:Image},
  // isMarketingAssetNeeded:{type:Boolean,default:false,required:true},
  // influencerPaymentDate:{type:Number,required:true},
  // shop:{type:Schema.Types.ObjectId,ref:"Shop"}
   
  
},{timestamps:true})

//export const Deal=mongoose.model("Deal",DealSchema);
module.exports = mongoose.model("Current-Deals",CurrentDeal);