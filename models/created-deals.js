import mongoose from 'mongoose';


const DealSchema= new mongoose.Schema({
   dealTitle:{type:String,required:true},
   influencerShareValue:{type:Number,required:true},
   customerDiscountValue:{type:Number,required:true},
   validity:{type:Number,required:true},
   promotionalImage:{type:Image},
   isMarketingAssetNeeded:{type:Boolean,default:false,required:true},
   influencerPaymentDate:{type:Number,required:true},
   shop:{type:Schema.Types.ObjectId,ref:"Shop"}
   
  
},{timestamps:true})

export const Deal=mongoose.model("Deal",DealSchema);