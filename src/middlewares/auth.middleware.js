import passport from "passport";
import createError from "http-errors";
import { Strategy as localStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

import { APP_CONFIG } from "../config/config.js";
import { userModel } from "../models/user.model.js";
import { generateAccessAndRefreshToken } from "../utils/helper.js";

passport.use(
  "local",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const userExist = await userModel.findOne({ email });
        if (!userExist) throw createError.Unauthorized("Invalid user");
        const validPassword = await userExist.comparePassword(password);
        if (!validPassword) throw createError.Unauthorized("Invalid user");

        const { accessToken, refreshToken } =
          await generateAccessAndRefreshToken(userExist);
        done(null, { accessToken, refreshToken, email });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      secretOrKey: APP_CONFIG.JWT_SECRETS,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const { _id } = token;
        const user = await userModel.findById(_id);
        if (!user) throw createError.Unauthorized("Invalid user");
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export function hasCheckRole(roles){
  return function (req, res, next) {
    if (roles.includes(req.user.role)) {
      return next();
    } else {
      return next(new Error("You don't have sufficient access to this route."));
    }
  };
};
