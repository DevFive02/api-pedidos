import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Dados inválidos",
      errors: err.issues
    })
  }

  return res.status(500).json({
    message: err.message || "Erro interno"
  })
}
