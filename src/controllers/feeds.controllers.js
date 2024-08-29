const { users, feeds, user_favorite_feeds } = require('../../models');
const { APIError, HttpStatusCode } = require('../helpers/api-error.helper');
const { generatePagination } = require('../helpers/paginator.helper');
const { Op } = require('sequelize');

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
			public: Boolean(public),
			topics: topics,
			createdBy: userId,
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

const findFeeds = async (req, res, next) => {
	try {
		const public = Boolean(req.public);
		const userId = !public ? req.user.id : null;

		const { topic, createdBy, createdAt, name, page = 1 } = req.query;

		const { offset, limit, order } = generatePagination({
			...req.query,
			sort: req?.query?.sort || 'updatedAt,DESC,createdAt,DESC',
		});

		const filters = {};

		if (topic) {
			filters.topics = {
				[Op.like]: `%${topic}%`,
			};
		}

		if (createdBy) {
			filters.createdBy = createdBy;
		}

		if (createdAt) {
			filters.createdAt = {
				[Op.gte]: new Date(createdAt),
			};
		}

		if (name) {
			filters.name = {
				[Op.like]: `%${name}%`,
			};
		}

		if (public) {
			filters.public = public;
		}

		const includes = [
			{
				model: user_favorite_feeds,
				as: 'favoriteUsers',
				attributes: ['id', 'userId'],
			},
		];

		if (public) {
			includes.push({
				model: users,
				as: 'creator',
				attributes: ['id', 'username'],
			});
		}

		const { count, rows } = await feeds.findAndCountAll({
			where: filters,
			include: includes,
			limit,
			offset,
			order,
		});

		const formattedRows = rows?.map((row) => {
			const sanitizeRow = {
				id: row.id,
				name: row.name,
				favorite: !public && row?.favoriteUsers?.some((e) => e.userId == userId),
				public: row.public,
				createdAt: row.createdAt,
				updatedAt: row.updatedAt,
			};

			if (public) {
				sanitizeRow.createdBy = row?.creator?.username || '';
			}

			return sanitizeRow;
		});

		res.status(HttpStatusCode.Ok).json({
			totalPages: Math.ceil(count / limit),
			currentPage: parseInt(page, 10),
			feeds: formattedRows,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createFeed,
	findFeeds,
};
