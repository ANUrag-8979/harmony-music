import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  myImages: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  classes: {
    type: Number,
    required: true,
    min: 0
  },
  learn: {
    type: [String],
    default: []
  },
  // testimonials: {
  //   type: [TestimonialSchema],
  //   default: []
  // },
  courseDirector: {
    type: String,
    required: true,
    trim: true
  },
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  para1: {
    type: String,
    required: true,
    trim: true
  },
  para2: {
    type: String,
    required: true,
    trim: true
  },
  directorUrl:{
    type: String,
    required: true,
    trim: true,
  },
  courseCatigory:{
    type: String, // string ,vocals
    required: true,
  },
  level:{
    type: String, //beginer intermidiate advancded
    required: true,
  },
  status:{
    type:"String",
    default:"pending",
  },
  demoVideoUrl:{
    type:String,
  }
}, {
  timestamps: true
});

// module.exports = mongoose.model('Page', PageSchema);
const Course = mongoose.models.courses ||  mongoose.model("courses",courseSchema)
export default Course
