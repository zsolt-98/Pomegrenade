import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../controllers/authController.js";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized. Log in again",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not authorized. Log in again.",
      });
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message });
  }
};

export default userAuth;
