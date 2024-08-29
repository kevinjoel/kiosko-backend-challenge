const { APIError, HttpStatusCode } = require('../helpers/api-error.helper');
const { validateAccessToken } = require('../helpers/jwt.helper');

const authenticator = async (req, _res, next) => {
	try {
		const token =
			req?.query?.accessToken ||
			req?.params?.accessToken ||
			req?.headers?.['x-access-token'] ||
			req?.headers?.['access-token'] ||
			req?.headers?.authorization?.split?.(' ')?.[1] ||
			null;

		if (token) {
			const decoded = await validateAccessToken(token);

			if (!decoded) {
				throw new APIError(
					'Invalid credentials or insufficient permits.',
					HttpStatusCode.Unauthorized,
					false,
				);
			}

			req.user = decoded;

			next();
		} else {
			throw new APIError(
				'Invalid credentials or insufficient permits.',
				HttpStatusCode.Forbidden,
				false,
			);
		}
	} catch (error) {
		next(error);
	}
};

const isAuthenticated = async (req, _res, next) => {
	try {
		const token =
			req?.query?.accessToken ||
			req?.params?.accessToken ||
			req?.headers?.['x-access-token'] ||
			req?.headers?.['access-token'] ||
			req?.headers?.authorization?.split?.(' ')?.[1] ||
			null;

		const decoded = await validateAccessToken(token);

		req.public = true;

		if (decoded) {
			req.public = false;
			req.user = decoded;
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	authenticator,
	isAuthenticated,
};
