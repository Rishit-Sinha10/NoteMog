import mongoose from "mongoose";
const planSchema=new mongoose.Schema(
    {
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     weekStartDate:{
        type:Integer,
        default:0,
        required:true,
     },
     constraints:{
        type:String,
        default:0,
        required:true,
     }   
    },{timestamps:true}
);
const plan =mongoose.model("plan",planSchema);
export default plan;