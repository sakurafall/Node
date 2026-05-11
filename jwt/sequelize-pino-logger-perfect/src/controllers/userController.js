import AppError from '../utils/AppError.js';
import { sendSuccessResponse } from '../utils/responseHelper.js';
import { generateToken } from '../utils/jwtHelper.js';
import { createUser as createUserApi, verifyUser as verifyUserApi } from '../services/userService.js';

export async function signup(req, res) {
  const { email, password } = req.body;
  const user = await createUserApi(email, password);
  const token = await generateToken(user);

  return sendSuccessResponse(res, { token, user }, 'Sign up successfully');
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await verifyUserApi(email, password);

  if (!user) {
    throw new AppError('Invalid email or password', 401, 'Unauthorized');
  }

  const token = await generateToken(user);
  return sendSuccessResponse(res, { token, user }, 'Login successfully');
}
