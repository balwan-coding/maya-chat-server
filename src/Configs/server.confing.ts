import MongoStore from "connect-mongo";
import session from "express-session";
import cors from "cors";
import * as env from "./env";

const isProduction = env.IS_PRODUCTION == "PRODUCTION";

export const corsConfigs = cors({
  origin: env.ORIGIN_PATH,
  methods: ["GET", "POST"],
  credentials: true,
});

export const sessionCoffings = session({
  name: "sid",
  secret: env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,

  cookie: {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24,
  },

  store: MongoStore.create({
    mongoUrl: env.DB_URL,
    collectionName: "sessions",
    stringify: false,
  }),
});
