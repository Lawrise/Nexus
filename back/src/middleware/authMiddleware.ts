import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['auth-token'];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      username: string;
    };
    req.user = verified;
    next();
  } catch (error) {
    res.clearCookie('auth-token');
    res.status(403).json({ error: "Invalid token" });
  }
};

export default authenticateToken;