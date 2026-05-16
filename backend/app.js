import express from "express"
import cors from "cors"
import { requireAuth } from "./middleware/Auth.middleware.js";
import Noteroute from "./route/note.route.js";
import Planroute from "./route/Plan.route.js"
import Subjectroute from "./route/subject.route.js"
import Taskroute from "./route/Task.route.js"
import Userroute from "./route/user.route.js"
import Summaryroute from "./route/Summary.route.js";
import mongoose, { mongo } from "mongoose";
export const app=express()
app.get("/",(req,res)=>{
    res.send("Hello World",201)
});
app.use(cors())
app.use("/api/v1/User",Userroute)
app.use("/api/v1/edit",requireAuth,Noteroute)
app.use("/api/v1/plan",requireAuth,Planroute)
app.use("/api/v1/Subject",requireAuth,Subjectroute)
app.use("/api/v1/Task",requireAuth,Taskroute)
app.use("/api/v1/Summary",requireAuth,Summaryroute)
 
