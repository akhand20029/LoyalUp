//import mongoose from 'mongoose';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DealSchema= new mongoose.Schema({
   dealTitle:{type:String,required:true},
   requiredVisits:{type:Number,required:true},
   expiryDate:{type:Date,required:true},
   reward:{type:String,required:true},
   dealStatus:{type:String,required:true},
  shopID:{type:Schema.Types.Number,refPath:"ShopProfile.shopID"}
   
  
},{timestamps:true})

module.exports = mongoose.model("Created-Deals",DealSchema); 