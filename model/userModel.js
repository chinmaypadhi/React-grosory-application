const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },

  password: {
    type: String,
    required: [true, "Please Provide a Password"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        //this validator is only works on create and save.
        return el === this.password;
      },
      message: "Password are not the same.",
    },
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
  },

  phone: {
    type: Number,
    required: true,
    minlength: 10,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  //Runs if password is going to change-forgotPass-only-email-field
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12); //hashing the password with costing of 12
  this.confirmPassword = undefined; //delete the confirmPassword field
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  //console.log(this.isNew);

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = this.passwordChangedAt.getTime() / 1000; //to milisecond
    console.log(changedTimeStamp, JWTTimeStamp);
    return JWTTimeStamp < changedTimeStamp;
  }
  //False means Not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); //for URL

  //For Database-encrypted
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 15 * 60 * 1000; //15 min

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
