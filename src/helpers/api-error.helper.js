const HttpStatusCode = {
	Ok: 200,
	Created: 201,
	NoContent: 204,
	MovedPermanently: 301,
	Found: 302,
	NotModified: 304,
	BadRequest: 400,
	Unauthorized: 401,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	Conflict: 409,
	InternalServerError: 500,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
};

class BaseError extends Error {
	constructor(message, httpCode, description, isOperational) {
		super(description);
		this.message = message;
		this.httpCode = httpCode;
		this.isOperational = isOperational;
	}

	statusCode() {
		return this.httpCode;
	}
}

class APIError extends BaseError {
	constructor(
		message,
		httpCode = HttpStatusCode.InternalServerError,
		isOperational = true,
		description = 'Internal Server Error',
	) {
		super(message, httpCode, description, isOperational);
	}
}

module.exports = {
	HttpStatusCode,
	BaseError,
	APIError,
};
