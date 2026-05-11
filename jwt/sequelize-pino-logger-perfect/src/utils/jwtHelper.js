import * as jose from 'jose';
import config from '../config/index.js';
import AppError from './AppError.js';

const JWT_SECRET = new TextEncoder().encode(config.jwt.secret);

export async function generateToken({ id, email }) {
  return await new jose.SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(id))
    .setIssuedAt()
    .setExpirationTime(config.jwt.expiresIn)
    .sign(JWT_SECRET);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    throw new AppError(error.message || 'Invalid token', 401, error.name);
  }
}
