export function sendJsonResponse(res, statusCode, message = 'Success', data = null) {
  return res.status(statusCode).json({
    message,
    ...(data !== null && data !== undefined && { data }),
  });
}

export function sendSuccessResponse(res, data, message = 'Success') {
  return sendJsonResponse(res, 200, message, data);
}

export function sendErrorResponse(res, message = 'Bad request', statusCode = 400) {
  return sendJsonResponse(res, statusCode, message);
}
