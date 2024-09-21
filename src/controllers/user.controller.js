import createError from 'http-errors';
import { userModel } from '../models/user.model.js';

export const signup = async(req, res, next) => {
    try {
        const { firstName, lastName, password, email, college, subject} = req.body;
        const userExist = await userModel.findOne({email}).lean();
        if(userExist) throw createError.Conflict("Email already exists");
        const user = await userModel.create(req.body);
        res.status(200).json({ message: "user created successfully", user})

    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, email } = req.user;
    res.status(200).json({ message: "user login successfully", accessToken });
  } catch (error) {
    next(error);
  }
};