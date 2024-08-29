const { HttpStatusCode, APIError } = require('../helpers/api-error.helper');
const { users } = require('../../models');
const { generateAccessTokens } = require('../helpers/jwt.helper');

const login = async (req, res, next) => {
	try {
		const payload = req.body;

		const user = await users.findOne({ where: { username: payload?.username } });
		const isMatchPassword = await user?.validPassword?.(payload.password);

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
		const payload = req.body;

		res.json({ payload });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	login,
	register,
};
