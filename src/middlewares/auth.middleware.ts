import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  EMPRESAID: number;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // const authHeader = req.headers.authorization;

  // if (!authHeader) {
  //   return res.status(401).json({
  //     message: "Token não informado",
  //   });
  // }

  // const [, token] = authHeader.split(" ");

  try {
    // const decoded = jwt.verify(
    //   token,
    //   process.env.JWT_SECRET!
    // ) as TokenPayload
    const decoded = jwt.verify(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFTVBSRVNBSUQiOjEsImlhdCI6MTc3Mzc4NDMyNSwiZXhwIjoxNzczODcwNzI1fQ.N2DM3Qv_nbam-wmzgienHuV6tPNbI_m-3nuPvo-dbl0",
      process.env.JWT_SECRET!,
    ) as TokenPayload;

    req.EMPRESAID = decoded.EMPRESAID;

    return next();
  } catch {
    return res.status(401).json({
      message: "Token inválido",
    });
  }
}
