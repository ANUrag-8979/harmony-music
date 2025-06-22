import mongoose  from "mongoose";

const studentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courses:{
        type: [String], // the name of all courses are unique
        default: []
    }
})

const Student = mongoose.models.students ||  mongoose.model("students",studentSchema);
export default Student;