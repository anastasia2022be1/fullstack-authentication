import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
  },
  tokenExpiresAt: {
    type: Date
  },
  posts: [
    {
      type: mongoose.ObjectId,
      ref: "Post"
    }
  ]
})

// Метод toJSON, чтобы исключить пароль из вывода
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
}

const User = mongoose.model("User", userSchema);

export default User;