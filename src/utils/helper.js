import jsonwebtoken from "jsonwebtoken";
const { sign} = jsonwebtoken;

import { APP_CONFIG } from "../config/config.js";

export const generateAccessAndRefreshToken = async (user) => {
  try {
    const { _id, role } = user;
    const accessToken = await sign({ _id, role }, APP_CONFIG.JWT_SECRETS, {
      expiresIn: "1d",
    });
    const refreshToken = await sign({ _id, role }, APP_CONFIG.JWT_SECRETS, {
      expiresIn: "365d",
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};
