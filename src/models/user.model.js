import { Schema, model } from "mongoose";
import { compare, hash } from "bcrypt";
import { APP_CONFIG } from "../config/config.js";
import { ROLES } from "../utils/enums.js";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: ROLES.USER },
    college: { type: String, default: true },
    subject: { type: String, default: true },
    refreshToken: { type: String, default: null }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', async function() {
    const hashPassword = await hash(this.password, APP_CONFIG.SALT_ROUNDS);
    this.password = hashPassword;
})

userSchema.methods.comparePassword = async function(password){
    return compare(password, this.password)
}

export const userModel = model("users", userSchema, "users");
