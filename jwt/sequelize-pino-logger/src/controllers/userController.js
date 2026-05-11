import AppError from '../utils/AppError.js';
import { createUser as createUserApi, verifyUser as verifyUserApi } from '../services/userServer.js';
import { sendSuccessResponse } from '../utils/responseHelper.js';

// signup controller
export async function createUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError(`Email and password are required`, 400, 'Bad request');
  }

  const createdUser = await createUserApi(email, password);

  return sendSuccessResponse(res, createdUser);
}

// login controller
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(`Email and password are required`, 400, 'Bad request');
  }

  const result = await verifyUserApi(email, password);

  if (!result) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  return sendSuccessResponse(res, result);
}