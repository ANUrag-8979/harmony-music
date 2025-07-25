import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"please provide user name"],
        unique:true
    },
    userPhoto:{
        type:String,
        default:"data:image/png;base64,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"
    },
    firstName:{
        type:String,
        require:[true,"please provide user name"],
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        require:[true,"please provide email name"],
        unique:true
    },
    password:{
        type:String,
        require:[true,"please provide email name"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    // Role:{
    //     type:String,
    //     default:"student",
    // },
    city:{
        type:String
    },
    state:{
        type:String
    },
    // profileImage:{
    //     type:String
    // },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken : String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users ||  mongoose.model("users",userSchema)

export default User;