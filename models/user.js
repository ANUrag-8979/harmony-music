import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"please provide user name"],
        unique:true
    },
    userPhoto:{
        type:String,
        default:"https://plus.unsplash.com/premium_photo-1677094310956-7f88ae5f5c6b?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    profilePhoto:{
        type:String
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken : String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users ||  mongoose.model("users",userSchema)

export default User;