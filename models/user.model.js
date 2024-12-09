import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: { 
    type: String,
    unique: true,
    required: true,
  
  },
  password: {
    type: String,
    unique: true,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  role: {
    type: String,
    enum: ["guest", "admin"], 
    default: "guest",
  },
});

const User = mongoose.model("User", userSchema);
export default User;