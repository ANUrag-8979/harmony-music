import mongoose  from "mongoose";

const teacherSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    specialty:{
        type:[String],
        defalt:[]
    },
    courses:{
        type: [String],
        default: []
    },
    description:{
        type:String,
        requied:true, // while applying it is compulsory
    },
    roles:{
        type:[String],
        default : [],
    },
    employed:{
        type:Boolean,
        default:false,
    }
});

const Teacher = mongoose.models.teachers ||  mongoose.model("teachers",teacherSchema);
export default Teacher;