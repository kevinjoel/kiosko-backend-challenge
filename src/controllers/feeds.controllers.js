const { users, feeds, user_favorite_feeds } = require('../../models');
const { APIError, HttpStatusCode } = require('../helpers/api-error.helper');

const createFeed = async (req, res, next) => {
	try {
		const { name, favorite, public, topics } = req.body;
		const userId = req.user.id;

		if (favorite) {
			const existingFavoriteFeed = await user_favorite_feeds.findOne({
				where: { userId },
			});

			if (existingFavoriteFeed) {
				throw new APIError(
					'You can only have one favorite feed.',
					HttpStatusCode.BadRequest,
					false,
				);
			}
		}

		const feed = await feeds.create({
			name,
			public,
			topics,
			userId,
		});

		if (favorite) {
			await user_favorite_feeds.create({
				feedId: feed.id,
				userId,
			});
		}

		res.status(HttpStatusCode.Created).json({
			message: 'The feed has been successfully created.',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createFeed,
};
