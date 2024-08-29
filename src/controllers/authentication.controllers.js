const { HttpStatusCode, APIError } = require('../helpers/api-error.helper');
const { users } = require('../../models');
const { generateAccessTokens } = require('../helpers/jwt.helper');

const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await users.findOne({ where: { username: username } });
		const isMatchPassword = await user?.validPassword?.(password);

		if (!user || !isMatchPassword) {
			throw new APIError('Invalid username or password', HttpStatusCode.NotFound, false);
		}

		const accessToken = generateAccessTokens({ id: user.id, username: user.username });

		res.json({ accessToken });
	} catch (error) {
		next(error);
	}
};

const register = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const existingUser = await users.findOne({ where: { username: username } });

		if (existingUser) {
			throw new APIError(
				`User already exists with this username: ${username} try a different one.`,
				HttpStatusCode.BadRequest,
				false,
			);
		}

		await users.create({ username, password });

		res.status(HttpStatusCode.Created).json({ message: 'User registered successfully.' });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	login,
	register,
};
