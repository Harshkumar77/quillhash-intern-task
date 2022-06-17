import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  fullName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  gender: {
    enum: ["male", "female"],
  },
  bio: {
    required: true,
    type: String,
  },
  profilePic: {
    required: true,
    type: String,
  },
  blockedUsers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  likedUsers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  superLikedUsers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  notifications: [
    {
      readed: {
        required: true,
        type: Boolean,
      },
      from: { type: mongoose.Types.ObjectId, ref: "user" },
      superliked: {
        required: true,
        type: Boolean,
      },
    },
  ],
})

export default mongoose.model("user", userSchema)
