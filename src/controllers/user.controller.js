import createError from 'http-errors';
import { userModel } from '../models/user.model.js';

/** SignUp */
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

/** SignIn */
export const signin = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, email } = req.user;
    res.status(200).json({ message: "user login successfully", accessToken });
  } catch (error) {
    next(error);
  }
};

/** Fetch all users */
export const show = async(req, res, next) => {
    try {
        const users = await userModel.find().lean();
        res.status(200).json({message: "User fetch successfully...", users})
    } catch (error) {
        next(error)
    }
}

/** Delete user by Id */
export const deleteUser = async(req, res, next) => {
    try {
        const {_id} = req.params;
        const user = await userModel.findByIdAndDelete(_id).lean();
        res.status(200).json({message: "User deleted successfully...", user})
    } catch (error) {
        next(error)
    }
}

/** Update user by Id */
export const update = async(req, res, next) => {
    try {
        const{ _id } = req.params;
        const user = await userModel.findByIdAndUpdate(_id, {$set: req.body}, {new: true})
        res.status(200).json({message: "User updated successfully...", user})
    } catch (error) {
        next(error)
    }
}

/** Get user by Id */
export const getById = async(req, res, next) => {
    try {
        const{ _id } = req.params;
    
        const user = await userModel.findById(_id)
        res.status(200).json({message: "User fetch successfully...", user})
    } catch (error) {
        next(error)
    }
}