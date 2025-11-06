import { NextFunction, Request, Response } from "express";
import { jwtVerify, JWTPayload } from "jose";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authenticateJwt = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
  
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.accessToken;

    const accessToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : cookieToken;

    console.log("accessToken received is :", accessToken);

    if (!accessToken) {
      res
        .status(401)
        .json({ success: false, error: "Access token not provided" });
      return;
    }


    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const userPayload = payload as JWTPayload & {
      userId: string;
      email: string;
      role: string;
    };

  
    req.user = {
      userId: userPayload.userId,
      email: userPayload.email,
      role: userPayload.role,
    };

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

export const isSuperAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role === "SUPER_ADMIN") {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: "Access denied! Super admin access required",
    });
  }
};
