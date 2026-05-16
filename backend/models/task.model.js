import mongoose, { Mongoose } from "mongoose";
const TaskSchema = new mongoose.Schema({
    UserId: {
        type: Mongoose.types.Schema.ObjectId,
        ref: "User"
    },
    SubjectId: {
        type: Mongoose.types.Schema.ObjectId,
        ref: "Subject"
    },
    title: {
        required: true,
        default: "",
        type: String
    },
    date: {
        required: true,
        default: "",
        type: String,
    },
    durationMins: {
        required: true,
        default: "",
        type: String,

    },
    status: {
        required: true,
        default: "",
        type: String,
        enum: [inactive, active]
    },

}, { timestamps: true })
const Task = mongoose.model("Task", TaskSchema);
export default Task;