//import mongoose from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CustomerSchema= new mongoose.Schema({
   username:{type:String,required:true},
   email:{type:String,required:true},
   mobile:{type:Number,required:true},
   pincode:{type:Number,required:true},
  // profilePicture:{type:Image},
   description:{type:String},
   password:{type:String,required:true},
   code:{type:String},
   customerID:{type:Number,required:true}

   
},{timestamps:true})

//export const Influencer =mongoose.model("Influencer",InfluencerSchema);
module.exports = mongoose.model("CustomerProfile",CustomerSchema);