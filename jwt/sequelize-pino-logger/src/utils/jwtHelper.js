// import jwt from 'jsonwebtoken';
import * as jose from 'jose';
import AppError from './AppError.js';

// jsonwebtoken version
// const JWT_SECRET = process.env.JWT_SECRET;

// jose version
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set. Please check your .env file and restart the dev server.');
}

export async function generateToken(data) {
  // jsonwebtoken version
  // const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: '20s' });

  // jose version
  const token = await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('20s')
    .sign(JWT_SECRET);

  return token;
}

export async function verifyToken(token) {
  try {
    // jsonwebtoken version
    // return jwt.verify(token, JWT_SECRET);

    // jose version
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    throw new AppError(error.message || 'Invalid token', 401, error.name);
  }
}