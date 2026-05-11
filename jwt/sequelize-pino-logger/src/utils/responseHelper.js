export function sendJsonResponse(res, statusCode, message = 'Success', data = null) {
  return res.status(statusCode).json({
    message,
    ...(data && { data }),
  });
}

export function sendSuccessResponse(res, data, message) {
  return sendJsonResponse(res, 200, message, data);
}

export function sendErrorResponse(res, message = 'Not found') {
  return sendJsonResponse(res, 404, message);
}
