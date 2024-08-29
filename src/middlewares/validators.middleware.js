const { validationResult } = require('express-validator');
const { HttpStatusCode } = require('../helpers/api-error.helper');

const requestBodyValidator = (req, res, next) => {
	if (!req.body) {
		return res.status(HttpStatusCode.BadRequest).send({
			message: 'Request body is required and cannot be empty.',
		});
	}

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(HttpStatusCode.BadRequest).json({
			message: 'Invalid input provided in request body.',
			errors: errors.array(),
		});
	}

	next();
};

const requestParamsValidator = (req, res, next) => {
	if (!req.params) {
		return res.status(HttpStatusCode.BadRequest).send({
			message: 'Request params is required and cannot be empty.',
		});
	}

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(HttpStatusCode.BadRequest).json({
			message: 'Invalid input provided in request params.',
			errors: errors.array(),
		});
	}

	next();
};

module.exports = {
	requestBodyValidator,
	requestParamsValidator,
};
