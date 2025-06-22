import mongoose from "mongoose"

const testimonialSchema = new mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Make sure this matches your User model name
    required: true, // Fixed typo: was "require"
  },
  quotes: [
    {
      // Changed to array of strings based on your data structure
      type: String,
      required: true,
      trim: true,
    },
  ],
})

const Testimonial = mongoose.models.testimonials || mongoose.model("testimonials", testimonialSchema)
export default Testimonial
