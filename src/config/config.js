import { config } from "dotenv";
import { cleanEnv, num, url, str } from "envalid";
config({ path: `.env.${process.env.NODE_ENV}` || ".env.development" });

export const APP_CONFIG = cleanEnv(process.env, {
  PORT: num({ devDefault: 3000, desc: "PORT number missing " }),
  DB_URL: url({ desc: " Database url missing" }),
  SALT_ROUNDS: num({ desc: "Salt round missing " }),
  JWT_SECRETS: str({ desc: "JWT secrets value missing" }),
  // REFRESH_JWT_SECRETS: str({ desc: "JWT secrets value missing" }),
});
