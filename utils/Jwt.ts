import jwt from 'jsonwebtoken'
import { ValidationError } from './ErrorHandler'

export const signJwt = (payload: object, options?: object) => {
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) {
    throw new ValidationError('JWT_SECRET not found')
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

export const verifyJwt = (token: string, options?: object) => {
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) {
    throw new ValidationError('JWT_SECRET not found')
  }
  return jwt.verify(token, JWT_SECRET, options)
}
