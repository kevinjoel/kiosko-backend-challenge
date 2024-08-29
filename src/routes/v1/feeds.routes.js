const { Router } = require('express');
const FeedsControllers = require('../../controllers/feeds.controllers');
const { requestBodyValidator } = require('../../middlewares/validators.middleware');
const { authenticator, isAuthenticated } = require('../../middlewares/authenticator.middleware');
const { body } = require('express-validator');

const router = Router();

router.get('', isAuthenticated, FeedsControllers.findFeeds);

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

router.put('', function (req, res) {
	res.send('Update feed');
});

router.delete('', function (req, res) {
	res.send('Delete feed');
});

module.exports = router;
