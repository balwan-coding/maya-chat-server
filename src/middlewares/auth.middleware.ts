import { NextFunction, Request, Response } from "express";

export const registerUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("------------------ body", req.body);
  const { name, email, gender, password, username, phoneNumber } = req.body;
  if (!name || !email || !gender || !password || !username || !phoneNumber) {
    res.status(400).json({
      message: "all filds required",
    });

    return;
  }
  next();
};

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { password, userNameOrEmail } = req.body;

  if (!password || !userNameOrEmail) {
    res.status(400).json({
      message: "all filds required",
    });

    return;
  }
  next();
};

// export const sessionhandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   if (!(req.session as any).userId) {
//     res.status(401).json({ error: "Unauthorized" });
//     return;
//   }

//   next();
// };

export const sessionAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("SESSION 3.1:", req.session);

  if (!req.session.user) {
    console.log("the session ids for loging");
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("the next function in the app", req.session.user);
  next();
};
