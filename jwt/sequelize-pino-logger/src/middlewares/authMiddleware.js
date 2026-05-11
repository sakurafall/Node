import AppError from '../utils/AppError.js';
import { verifyToken } from '../utils/jwtHelper.js';

export default async function authMiddleware(req, _res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AppError('Missing or malformed Authorization header', 401, 'Unauthorized');
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    throw new AppError('Token is required', 401, 'Unauthorized');
  }

  const payload = await verifyToken(token);
  req.user = payload.data;

  next();
}
