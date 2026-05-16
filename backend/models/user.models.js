import bcrypt from "bcrypt"
import mongoose, { Mongoose } from "mongoose"
const userSchema =new mongoose.Schema({
    Username:{
        required:true,
        unique:true,
        lowercase:true,
        type:String,
        default:""
    },
    email:{
        required:true,
        unique:true,
        lowercase:true,
        type:String,
        default:""
    },
    password:{
        required:true,
        unique:true,
        lowercase:true,
        type:String,
        default:""
    }
},{timestamps:true})
const user = mongoose.model("User", userSchema);
export default user;