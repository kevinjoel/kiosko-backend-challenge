const { users, feeds, user_favorite_feeds } = require('../../models');
const { APIError, HttpStatusCode } = require('../helpers/api-error.helper');
const { findNewsPaper } = require('../helpers/newspaper.helper');
const { generatePagination } = require('../helpers/paginator.helper');
const { Op } = require('sequelize');

const createFeed = async (req, res, next) => {
	try {
		const { name, favorite, public: isPublic, topics } = req.body;
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
			public: Boolean(isPublic),
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
		const isPublic = Boolean(req.public);
		const userId = !isPublic ? req.user.id : null;

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

		if (isPublic) {
			filters.public = isPublic;
		}

		const includes = [
			{
				model: user_favorite_feeds,
				as: 'favoriteUsers',
				attributes: ['id', 'userId'],
			},
		];

		if (isPublic) {
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
				favorite: !isPublic && row?.favoriteUsers?.some((e) => e.userId == userId),
				public: row.public,
				createdAt: row.createdAt,
				updatedAt: row.updatedAt,
			};

			if (isPublic) {
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

const findFeedDetails = async (req, res, next) => {
	try {
		const isPublic = Boolean(req.public);
		const userId = !isPublic ? req.user.id : null;
		const feedId = req.params?.id;
		const { page = 1, startYear, endYear, searchTerm } = req.query;

		const feed = await feeds.findOne({
			where: { id: feedId },
			attributes: { exclude: ['createdBy'] },
			include: [
				{
					model: user_favorite_feeds,
					as: 'favoriteUsers',
					attributes: ['id', 'userId'],
				},
			],
		});

		if (!feed) {
			throw new APIError(
				`No feed found with this id: ${feedId}`,
				HttpStatusCode.NotFound,
				false,
			);
		}

		const resources = await findNewsPaper({
			page,
			year1: startYear,
			year2: endYear,
			terms: searchTerm,
		});

		const sanitizeFeed = {
			id: feed.id,
			name: feed.name,
			favorite: !isPublic && row?.favoriteUsers?.some((e) => e.userId == userId),
			public: feed.public,
			...resources,
			createdAt: feed.createdAt,
			updatedAt: feed.updatedAt,
		};

		res.status(HttpStatusCode.Ok).json(sanitizeFeed);
	} catch (error) {
		next(error);
	}
};

const updateFeed = async (req, res, next) => {
	try {
		const feedId = req.params.id;
		const { name, topics, public: isPublic, createdBy } = req.body;

		const feed = await feeds.findByPk(feedId);

		if (!feed) {
			throw new APIError(`Feed not found with id: ${feedId}`, HttpStatusCode.NotFound, false);
		}

		await feed.update({
			name,
			topics: Array.isArray(topics) ? topics : JSON.parse(topics),
			public: Boolean(isPublic),
			createdBy,
		});

		const result = await feeds.findOne({
			where: { id: feedId },
			include: [
				{
					model: users,
					as: 'creator',
					attributes: ['username'],
				},
			],
		});

		const sanitizedFeed = {
			id: result.id,
			name: result.name,
			topics: result.topics,
			public: result.public,
			createdBy: result.creator ? result.creator.username : null,
			updatedAt: result.updatedAt,
		};

		res.status(HttpStatusCode.Ok).json(sanitizedFeed);
	} catch (error) {
		next(error);
	}
};

const deleteFeed = async (req, res, next) => {
	try {
		const feedId = req.params.id;

		const feed = await feeds.findByPk(feedId);
		if (!feed) {
			throw new APIError(`Feed not found with id: ${feedId}`, HttpStatusCode.NotFound, false);
		}

		await feed.destroy();

		res.status(HttpStatusCode.NoContent).send();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createFeed,
	findFeeds,
	findFeedDetails,
	updateFeed,
	deleteFeed,
};
