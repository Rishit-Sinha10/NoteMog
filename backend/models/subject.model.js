import mongoose, { Mongoose } from "mongoose";
const subjectSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    color:{
        required:true,
        type:[],
        default:"",
    },
    Subject:{
        required:true,
        type:[],
        default:"",
        unique:true,
        lowercase:true,
        index:1,
    }
},{timestamps:true});
const Subject =mongoose.model("Subject",subjectSchema);
export default Subject;