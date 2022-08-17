import mongoose from 'mongoose';


const TransactionSchema= new mongoose.Schema({
   customerName:{type:String,required:true},
   customerMobile:{type:Number,required:true},
   orderValue:{type:Number,required:true},
   netBillAmount:{type:Number,required:true},
   discount:{type:Number,required:true},
   influencerShare:{type:Number,required:true},
   totalAmount:{type:Number,required:true},
   influencerCode:{type:Number,required:true},
   paymentProof:{type:Image},
   paymentStatus:{type:String,required:true},
   shopId:{type:Schema.Types.ObjectId,ref:"Shop"},
   influencerId:{type:Schema.Types.ObjectId,ref:"Influencer"},
  
},{timestamps:true})

export const Transaction=mongoose.model("Transaction",TransactionSchema);