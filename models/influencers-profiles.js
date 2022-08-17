import mongoose from "mongoose";

const InfluencerSchema= new mongoose.Schema({
   username:{type:String,required:true,unique:true},
   email:{type:String,required:true,unique:true},
   mobile:{type:Number,required:true,unique:true},
   pincode:{type:Number,required:true},
   profilePicture:{type:Image},
   description:{type:String},
   password:{type:String,required:true},
   code:{type:String}
   
},{timestamps:true})

export const Influencer =mongoose.model("Influencer",InfluencerSchema);