import { Request, Response, NextFunction } from 'express'
import sanitize from 'sanitize-html'

export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitize(req.body[key])
      }
    }
  }
  next()
}
