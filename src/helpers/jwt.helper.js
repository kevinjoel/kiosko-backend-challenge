const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'development';

const generateAccessTokens = (
	data,
	expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '1d',
) => {
	const secret = Buffer.from(JWT_SECRET, 'base64');

	const accessToken = jwt.sign(data, secret, {
		expiresIn,
	});

	return accessToken;
};

const validateAccessToken = async (token) => {
	const secret = Buffer.from(JWT_SECRET, 'base64');

	const validated = new Promise((resolve) => {
		jwt.verify(token, secret, {}, function (error, decoded) {
			if (error) {
				resolve(null);
			} else {
				resolve(decoded);
			}
		});
	});

	return validated;
};

module.exports = {
	generateAccessTokens,
	validateAccessToken,
};
