import { Request, Response, NextFunction } from "express";

// Middleware to authorize roles
export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || user.role !== role) {
      return res
        .status(403)
        .json({ error: "Access denied: Insufficient permissions" });
    }

    next();
  };
};

// import jwt from "jsonwebtoken";

// const generateToken = (user: { id: number; email: string; role: string }) => {
//   return jwt.sign(
//     { id: user.id, email: user.email, role: user.role },
//     process.env.JWT_SECRET as string,
//     { expiresIn: "1h" } // Token expiry
//   );
// };
