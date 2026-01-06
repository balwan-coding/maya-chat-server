import bcrypt from "bcryptjs";
import { SALT_ROUND } from "../Configs/env";


export const hasPassword = async (plain: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUND);
  const hash = await bcrypt.hash(plain, salt);
  return hash;
};

export const virifyPassword = async (
  palin: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(palin, hash);
};
