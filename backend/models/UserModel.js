//Schema and model for user data

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
    default: "my city",
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user", //specify a default user because upon creation of user we will be checking if the created account is the first in the database. If account it first give it an admin role else refer to default value.
    required: true,
  },
});

export default mongoose.model("UserModel", UserSchema);
