import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Middleware to authenticate JWT
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Assuming "Bearer <token>"

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    // Attach user information to the request object
    req.user = user;
    next();
  });
};
