const { Router } = require('express');
const FeedsControllers = require('../../controllers/feeds.controllers');
const { requestBodyValidator } = require('../../middlewares/validators.middleware');
const { authenticator, isAuthenticated } = require('../../middlewares/authenticator.middleware');
const { body } = require('express-validator');

const router = Router();

/**
 * @swagger
 * /feeds:
 *   get:
 *     summary: Retrieves a list of feeds with optional filters and pagination.
 *     tags: [Feeds]
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         description: Filter feeds by topic keyword.
 *       - in: query
 *         name: createdBy
 *         schema:
 *           type: string
 *         description: Filter feeds by the ID of the user who created them.
 *       - in: query
 *         name: createdAt
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter feeds created on or after this date.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter feeds by name keyword.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "updatedAt,DESC,createdAt,DESC"
 *         description: Sort feeds by fields and order (e.g., "field,ASC/DESC").
 *     responses:
 *       200:
 *         description: Successful response with a list of feeds.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages available.
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number.
 *                 feeds:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the feed.
 *                       name:
 *                         type: string
 *                         description: The name of the feed.
 *                       favorite:
 *                         type: boolean
 *                         description: Indicates if the feed is marked as favorite by the user (if authenticated).
 *                       public:
 *                         type: boolean
 *                         description: Indicates if the feed is public.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the feed was created.
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the feed was last updated.
 *                       createdBy:
 *                         type: string
 *                         description: The username of the creator (if public).
 *       400:
 *         description: Bad request if invalid query parameters are provided.
 *       401:
 *         description: Unauthorized if the user is not authenticated.
 */
router.get('', isAuthenticated, FeedsControllers.findFeeds);

/**
 * @swagger
 * /feeds/{id}:
 *   get:
 *     summary: Retrieves details of a specific feed.
 *     tags: [Feeds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the feed to retrieve.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: startYear
 *         schema:
 *           type: integer
 *           example: 1900
 *         description: The start year for filtering resources.
 *       - in: query
 *         name: endYear
 *         schema:
 *           type: integer
 *           example: 2024
 *         description: The end year for filtering resources.
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *           example: "commerce"
 *         description: The search term for filtering resources.
 *     responses:
 *       200:
 *         description: Successful response with feed details and resources.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the feed.
 *                 name:
 *                   type: string
 *                   description: The name of the feed.
 *                 favorite:
 *                   type: boolean
 *                   description: Indicates if the feed is marked as favorite by the user (if authenticated).
 *                 public:
 *                   type: boolean
 *                   description: Indicates if the feed is public.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the feed was created.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the feed was last updated.
 *                 resources:
 *                   type: object
 *                   description: The resources associated with the feed.
 *                   properties:
 *                     count:
 *                       type: integer
 *                       description: The number of resources.
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             description: The title of the resource.
 *                           type:
 *                             type: string
 *                             description: The type of the resource.
 *                           publisher:
 *                             type: string
 *                             nullable: true
 *                             description: The publisher of the resource.
 *                           language:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: The languages of the resource.
 *                           date:
 *                             type: integer
 *                             description: The publication date of the resource.
 *       400:
 *         description: Bad request if the feed is not found.
 *       401:
 *         description: Unauthorized if the user is not authenticated.
 */
router.get('/:id', isAuthenticated, FeedsControllers.findFeedDetails);

/**
 * @swagger
 * /feeds:
 *   post:
 *     summary: Create a new feed.
 *     tags: [Feeds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - topics
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the feed.
 *                 example: "Kiosko Feed"
 *               favorite:
 *                 type: boolean
 *                 description: If the feed is marked as favorite by the user.
 *                 example: true
 *               public:
 *                 type: boolean
 *                 description: If the feed is accessible to all users.
 *                 example: true
 *               topics:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The list of unique topics associated with the feed.
 *                 example: ["Colima", "E-commerce", "Retail", "Services", "Stock"]
 *     responses:
 *       201:
 *         description: The feed has been successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The feed has been successfully created.
 *       400:
 *         description: Bad request, validation error or favorite feed already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Topics must be unique.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred during feed creation.
 */
router.post(
	'',
	authenticator,
	[
		body('name').notEmpty().withMessage('Feed name is required.'),
		body('topics')
			.isArray({ min: 1, max: 5 })
			.withMessage('A feed must have at least 1 and at most 5 topics.'),
		body('topics.*')
			.isString()
			.withMessage('Each topic must be a string.')
			.bail()
			.custom((_value, { req }) => {
				const topics = req.body.topics;
				if (new Set(topics).size !== topics.length) {
					throw new Error('Topics must be unique.');
				}
				return true;
			}),
	],
	requestBodyValidator,
	FeedsControllers.createFeed,
);

/**
 * @swagger
 * /feeds/{id}:
 *   put:
 *     summary: Updates a specific feed.
 *     tags: [Feeds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the feed to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the feed.
 *               topics:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: A list of topics associated with the feed.
 *               public:
 *                 type: boolean
 *                 description: Indicates if the feed is public.
 *               createdBy:
 *                 type: string
 *                 description: The ID of the user who created the feed.
 *     responses:
 *       200:
 *         description: Successful update of the feed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the updated feed.
 *                 name:
 *                   type: string
 *                   description: The name of the updated feed.
 *                 topics:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The updated list of topics.
 *                 public:
 *                   type: boolean
 *                   description: Indicates if the feed is public.
 *                 createdBy:
 *                   type: string
 *                   description: The ID of the user who created the feed.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the feed was last updated.
 *       400:
 *         description: Bad request if invalid input data is provided.
 *       404:
 *         description: Feed not found if the specified ID does not exist.
 *       401:
 *         description: Unauthorized if the user is not authenticated.
 */
router.put(
	'/:id',
	authenticator,
	[
		body('name').notEmpty().withMessage('Name is required'),
		body('topics').isArray().withMessage('Topics must be an array'),
		body('public').isBoolean().withMessage('Public status must be a boolean'),
	],
	requestBodyValidator,
	FeedsControllers.updateFeed,
);

/**
 * @swagger
 * /feeds/{id}:
 *   delete:
 *     summary: Deletes a feed by ID.
 *     tags: [Feeds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the feed to delete.
 *     responses:
 *       200:
 *         description: Feed successfully deleted.
 *       404:
 *         description: Feed not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authenticator, FeedsControllers.deleteFeed);

module.exports = router;
