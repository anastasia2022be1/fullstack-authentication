import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
  }
})

// Хук для хеширования пароля перед сохранением
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {  // Хешируем только изменённый пароль
    this.password = await bcrypt.hash(this.password, 10);  // Хешируем пароль с солью
  }
  next();
});

// Метод для сравнения пароля при логине
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Метод toJSON, чтобы исключить пароль из вывода
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
}

const User = mongoose.model("User", userSchema);

export default User;