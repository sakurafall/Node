import { ZodError } from 'zod';
import { logger } from './loggerHelper.js';
import { sendJsonResponse } from './responseHelper.js';
import AppError from './AppError.js';

function normalizeError(err) {
  if (err instanceof AppError) {
    return { statusCode: err.statusCode, message: err.message, name: err.name };
  }

  if (err instanceof ZodError) {
    const message = err.issues
      .map((issue) => `${issue.path.join('.') || 'body'}: ${issue.message}`)
      .join('; ');
    return { statusCode: 400, message, name: 'ValidationError' };
  }

  if (err?.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors?.[0]?.path ?? 'field';
    return { statusCode: 409, message: `Duplicate value for ${field}`, name: err.name };
  }

  if (err?.name === 'SequelizeValidationError') {
    const message = err.errors?.map((e) => e.message).join('; ') ?? 'Validation failed';
    return { statusCode: 400, message, name: err.name };
  }

  return {
    statusCode: err?.statusCode ?? 500,
    message: err?.message ?? 'Internal Server Error',
    name: err?.name ?? 'Error',
  };
}

export default function globalErrorHandler(err, req, res, _next) {
  const { statusCode, message, name } = normalizeError(err);

  const logPayload = { err, req: { id: req.id, method: req.method, url: req.originalUrl } };
  if (statusCode >= 500) {
    logger.error(logPayload, `Unhandled error: ${name}`);
  } else {
    logger.warn(logPayload, `Operational error: ${name}`);
  }

  return sendJsonResponse(res, statusCode, message);
}
