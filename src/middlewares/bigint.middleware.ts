import { Request, Response, NextFunction } from "express"

export function bigintMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const originalJson = res.json.bind(res)

  res.json = (data: any) => {
    const safeData = JSON.parse(
      JSON.stringify(data, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    )

    return originalJson(safeData)
  }

  next()
}
