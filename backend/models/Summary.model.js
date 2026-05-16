import mongoose from "mongoose";
const SummarySchema= new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    noteId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Note"
    },
    mode:{
        required:true,
        default:[],
        lowercase:true,
        type:String,
    },
    ShortSummary:{
        required:true,
        default:[],
        lowercase:true,
        type:String,
    },
    KeyPoints:{
        required:true,
        default:[],
        lowercase:true,
        type:String,
        unique
    },
    terms:{
        required:true,
        default:[],
        lowercase:true,
        type:String,
    }
},{timestamps:true})
const Summary=mongoose.model("Summary",SummarySchema)
export default Summary;