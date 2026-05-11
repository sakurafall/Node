import AppError from '../utils/AppError.js';
import { verifyToken } from '../utils/jwtHelper.js';

const BEARER_PREFIX = 'Bearer ';

export default async function authMiddleware(req, _res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith(BEARER_PREFIX)) {
    return next(new AppError('Missing or malformed Authorization header', 401, 'Unauthorized'));
  }

  const token = authorization.slice(BEARER_PREFIX.length).trim();
  if (!token) {
    return next(new AppError('Token is required', 401, 'Unauthorized'));
  }

  try {
    const payload = await verifyToken(token);
    req.user = {
      id: Number(payload.sub),
      email: payload.email,
    };
    next();
  } catch (err) {
    next(err);
  }
}
