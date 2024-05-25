import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
 
  price: {
    type: Number,
    required: true,
  },
  maxGroupSize: {
    type: Number,
    required: true,
  },
 
  desc: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },

  
},{timestamps:true});
export default mongoose.model("Tour",tourSchema);