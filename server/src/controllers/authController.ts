import { prisma } from "../server";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/** Generate JWT token */
function generateToken(userId: string, email: string, role: string): string {
  return jwt.sign({ userId, email, role }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
}

/** Set JWT in secure HTTP-only cookie */
/** Set JWT in secure HTTP-only cookie */
function setToken(res: Response, token: string): void {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", token, {
    httpOnly: true, // cannot be accessed by JS
    secure: isProduction, // HTTPS only in prod
    sameSite: isProduction ? "none" : "lax", // 'none' for cross-site cookies
    path: "/", // ensure cookie is sent everywhere
    maxAge: 60 * 60 * 1000, // 1 hour
  });
}

/** Register user */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res
        .status(400)
        .json({ success: false, error: "All fields are required" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({
        success: false,
        error: "User with this email already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "USER" },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: user.id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, error: "Registration failed" });
  }
};

/** Login user */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ success: false, error: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, error: "Invalid credentials" });
      return;
    }

    const token = generateToken(user.id, user.email, user.role);
    setToken(res, token); // sets cookie automatically

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken: token, // optional: still send token for frontend API use
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Login failed" });
  }
};

/** Logout user */
export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({
    success: true,
    message: "User logged out successfully",
  });
};
