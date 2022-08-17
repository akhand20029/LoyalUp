import mongoose from "mongoose";


const ShopSchema= new mongoose.Schema({
   storeName:{type:String,required:true,unique:true},
   storeOwnerName:{type:String,required:true,unique:true},
   storeEmail:{type:String,required:true,unique:true},
   storeMobile:{type:Number,required:true,unique:true},
   storePincode:{type:Number,required:true},
   password:{type:String,required:true},
   description:{type:String,required:true},
   ShopeProfilePicture:{type:Image},
   address:{type:String,required:true},
   category:{type:String,required:true},
   timing:{type:String,required:true}
  
   
},{timestamps:true})

export const Shop =mongoose.model("Shop",ShopSchema);