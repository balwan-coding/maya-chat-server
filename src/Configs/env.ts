import "dotenv/config";

type DB_URL_TYPE = string | undefined;

export const SALT_ROUND: number = Number(process.env.SALT_ROUND) || 10;

export const APP_PORT = process.env.PORT || 5000;

export const DB_URL: DB_URL_TYPE = process.env.DB_URL || undefined;

export const ORIGIN_PATH: DB_URL_TYPE = process.env.ORIGIN_PATH;

export const JWT: DB_URL_TYPE = process.env.JWT;

export const SESSION_SECRET: DB_URL_TYPE =
  process.env.SESSION_SECRET || undefined;
