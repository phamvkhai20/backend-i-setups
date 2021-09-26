const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: "{PATH} is required!" },
    username: { type: String, require: "{PATH} is required!", unique: true },
    email: { type: String, unique: true },
    bio: { type: String },
    website: { type: String },
    avatar: { type: String },
    active: { type: Boolean, default: false },
    role: { type: Number, default: 1 },
    password: { type: String, require: true, select: false },
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
