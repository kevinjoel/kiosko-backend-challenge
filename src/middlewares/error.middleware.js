const { BaseError, HttpStatusCode } = require('../helpers/api-error.helper');

class ErrorMessageHandler {
	handleError(err) {
		console.error('ErrorHandler: ', err.message);

		let message = err.message;

		try {
			message = JSON.parse(err.message);
		} catch (error) {
			message = err.message;
		}

		return message;
	}

	isTrustedError(error) {
		if (error instanceof BaseError) {
			return error.isOperational;
		}
		return false;
	}
}

const errorMessageHandler = new ErrorMessageHandler();

const ErrorParser = async (err, req, res, next) => {
	if (!errorHandler.isTrustedError(err)) {
		next(err);
	}

	const error = errorMessageHandler.handleError(err);

	const statusCode = Number(err.httpCode || HttpStatusCode.InternalServerError);

	res.status(statusCode).json({ ...err, error, meta: req.meta });
};

module.exports = {
	ErrorMessageHandler,
	ErrorParser,
};
