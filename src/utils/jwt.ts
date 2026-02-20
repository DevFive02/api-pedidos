import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export function gerar_token(EMPRESAID: number) {
  return jwt.sign(
    { EMPRESAID },
    JWT_SECRET,
    { expiresIn: "1d" }
  )
}
