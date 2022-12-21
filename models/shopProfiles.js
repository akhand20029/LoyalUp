const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ShopSchema= new mongoose.Schema({
   shopName:{type:String},
   shopOwnerName:{type:String},
   email:{type:String},
   shopMobile:{type:Number},
   shopPincode:{type:Number},
   password:{type:String}, 
   description:{type:String},
  // ShopeProfilePicture:{type:Image},
   address:{type:String},
   category:{type:String}, 
   timing:{type:String},
   shopID:{type:Number}

  
   
},{timestamps:true})

//export const Shop =mongoose.model("Shop",ShopSchema);
module.exports = mongoose.model("ShopProfile",ShopSchema);