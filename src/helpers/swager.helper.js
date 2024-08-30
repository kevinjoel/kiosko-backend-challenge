// const swaggerAutogen = require('swagger-autogen')();

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Kiosko Challenge API',
		description: 'Documentation for Kiosko Challenge API',
		version: '1.0.0',
	},
	host: 'localhost:3000',
	basePath: '/',
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
		schemas: {
			User: {
				type: 'object',
				properties: {
					id: {
						type: 'integer',
						description: 'The auto-generated ID of the user.',
					},
					username: {
						type: 'string',
						description: 'The unique username of the user.',
					},
					password: {
						type: 'string',
						description: 'The hashed password of the user.',
					},
					createdAt: {
						type: 'string',
						format: 'date-time',
						description: 'The date and time when the user was created.',
					},
					updatedAt: {
						type: 'string',
						format: 'date-time',
						description: 'The date and time when the user was last updated.',
					},
				},
				required: ['username', 'password'],
				example: {
					id: 1,
					username: 'johndoe',
					password: 'hashed_password',
					createdAt: '2024-08-29T00:00:00.001Z',
					updatedAt: '2024-08-29T00:00:00.001Z',
				},
			},
			Feed: {
				type: 'object',
				properties: {
					id: {
						type: 'integer',
						description: 'The auto-generated ID of the feed.',
					},
					name: {
						type: 'string',
						description: 'The name of the feed.',
					},
					favorite: {
						type: 'boolean',
						description: 'Indicates if the feed is marked as favorite by the user.',
					},
					public: {
						type: 'boolean',
						description: 'Indicates if the feed is accessible to all users.',
					},
					topics: {
						type: 'array',
						items: {
							type: 'string',
						},
						description:
							'The list of unique topics associated with the feed (min 1, max 5).',
					},
					createdAt: {
						type: 'string',
						format: 'date-time',
						description: 'The date and time when the user was created.',
					},
					updatedAt: {
						type: 'string',
						format: 'date-time',
						description: 'The date and time when the user was last updated.',
					},
				},
				example: {
					id: 1,
					name: 'Kiosko Feed',
					favorite: false,
					public: true,
					topics: ['Colima', 'E-commerce', 'Retail', 'Services', 'Stock'],
					createdAt: '2024-08-29T00:00:00.001Z',
					updatedAt: '2024-08-29T00:00:00.001Z',
				},
			},
			UserFavoriteFeed: {
				type: 'object',
				properties: {
					id: {
						type: 'integer',
						description: 'The auto-generated ID of the user_favorite_feeds entry.',
					},
					feedId: {
						type: 'integer',
						description: 'The ID of the associated feed.',
					},
					userId: {
						type: 'integer',
						description: 'The ID of the associated user.',
					},
					createdAt: {
						type: 'string',
						format: 'date-time',
						description: 'The date and time when the user was created.',
					},
					updatedAt: {
						type: 'string',
						format: 'date-time',
						description: 'The date and time when the user was last updated.',
					},
				},
			},
		},
	},
	security: [
		{
			bearerAuth: [],
		},
	],
};

/**
 * Uncomment to generate swagger output
 */
// const outputFile = './swagger-output.json';
// const endpointFiles = ['./routes/index.js'];

// swaggerAutogen(outputFile, endpointFiles, swaggerDefinition);

module.exports = {
	swaggerDefinition,
};
