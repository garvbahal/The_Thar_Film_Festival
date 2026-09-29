import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error("Missin Jwt secret");
      }
      const decoded = jwt.verify(token, jwtSecret);

      if (
        typeof decoded === "string" ||
        typeof decoded.id !== "string" ||
        !["leader", "member", "admin"].includes(decoded.role as string)
      ) {
        return res.status(401).json({
          success: false,
          message: "Invalid token payload",
        });
      }

      req.user = {
        id: decoded.id,
        role: decoded.role,
      };
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

export const isParticipant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: "User not logged in",
      });
    }
    const role = req.user.role;
    if (role !== "leader" && role !== "member") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for participants only!!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: "User not logged in",
      });
    }
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};
