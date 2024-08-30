const request = require('supertest');
const app = require('../src/server');
const { feeds, sequelize } = require('../models');

describe('Feed API', () => {
	let server;
	let accessToken = null;

	beforeAll(async () => {
		await sequelize.authenticate();
		await sequelize.sync({ force: true });
		server = app.listen(4000); // Start the server on port 4000

		await new Promise((resolve) => {
			request(server)
				.post('/api/v1/authentication/register')
				.send({
					username: 'kiosko',
					password: "z+bS7z8P@@BfMu!LA#'f",
				})
				.end(() => {
					resolve(true);
				});
		});
		await new Promise((resolve) => {
			request(server)
				.post('/api/v1/authentication/login')
				.send({
					username: 'kiosko',
					password: "z+bS7z8P@@BfMu!LA#'f",
				})
				.end(function (_err, res) {
					console.log('res.body', res.body);
					accessToken = res.body.accessToken;
					resolve(true);
				});
		});
	});

	afterAll(async () => {
		await sequelize.close();
		await server.close(); // Close the server after tests
	});

	// Test for GET /feeds
	describe('GET /feeds', () => {
		it('should return a list of feeds', async () => {
			const response = await request(server).get('/api/v1/feeds');
			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty('totalPages');
			expect(response.body).toHaveProperty('currentPage');
			expect(response.body).toHaveProperty('feeds');
		});
	});

	// Test for POST /feeds
	describe('POST /feeds', () => {
		it('should create a new feed', async () => {
			const response = await request(server)
				.post('/api/v1/feeds')
				.set('access-token', accessToken)
				.send({
					name: 'New Feed',
					topics: ['new topic'],
					public: true,
				});

			expect(response.statusCode).toBe(201);
			expect(response.body).toHaveProperty('message');
		});

		it('should return 400 if request body is invalid', async () => {
			const response = await request(server)
				.post('/api/v1/feeds')
				.set('access-token', accessToken)
				.send({
					name: '',
					topics: [],
					public: 'not-a-boolean', // Invalid type
					createdBy: 1,
				});

			expect(response.statusCode).toBe(400);
		});
	});

	// Test for GET /feeds/:id
	describe('GET /feeds/:id', () => {
		it('should return a single feed', async () => {
			const feed = await feeds.create({
				name: 'Test Feed',
				topics: ['topic1'],
				public: true,
				createdBy: 1,
			});

			const response = await request(server).get(`/api/v1/feeds/${feed.id}`);
			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty('id', feed.id);
			expect(response.body).toHaveProperty('name', 'Test Feed');
		});

		it('should return 404 if feed does not exist', async () => {
			const response = await request(server).get('/api/v1/feeds/9999');
			expect(response.statusCode).toBe(404);
		});
	});

	// Test for PUT /feeds/:id
	describe('PUT /feeds/:id', () => {
		it('should update an existing feed', async () => {
			const feed = await feeds.create({
				name: 'Old Feed',
				topics: JSON.stringify(['old topic']),
				public: true,
				createdBy: 1,
			});

			const response = await request(server)
				.put(`/api/v1/feeds/${feed.id}`)
				.set('access-token', accessToken)
				.send({
					name: 'Updated Feed',
					topics: ['updated topic'],
					public: false,
				});

			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty('name', 'Updated Feed');
			expect(response.body).toHaveProperty('public', false);
		});

		it('should return 404 if feed does not exist', async () => {
			const response = await request(server)
				.put('/api/v1/feeds/9999')
				.set('access-token', accessToken)
				.send({
					name: 'New Feed',
					topics: ['New topic'],
					public: true,
				});
			expect(response.statusCode).toBe(404);
		});

		it('should return 400 if request body is invalid', async () => {
			const feed = await feeds.create({
				name: 'New Feed',
				topics: ['New topic'],
				public: true,
				createdBy: 1,
			});

			const response = await request(server)
				.put(`/api/v1/feeds/${feed.id}`)
				.set('access-token', accessToken)
				.send({
					name: 'Malformed body',
				});

			expect(response.statusCode).toBe(400);
		});
	});

	// Test for DELETE /feeds/:id
	describe('DELETE /feeds/:id', () => {
		it('should delete a feed', async () => {
			const feed = await feeds.create({
				name: 'Feed to Delete',
				topics: JSON.stringify(['delete topic']),
				public: true,
				createdBy: 1,
			});

			const response = await request(server)
				.delete(`/api/v1/feeds/${feed.id}`)
				.set('Authorization', 'Bearer ' + accessToken);
			expect(response.statusCode).toBe(204);

			const checkResponse = await request(server)
				.get(`/api/v1/feeds/${feed.id}`)
				.set('Authorization', 'Bearer ' + accessToken);
			expect(checkResponse.statusCode).toBe(404);
		});

		it('should return 404 if feed does not exist', async () => {
			const response = await request(server)
				.delete('/api/v1/feeds/9999')
				.set('Authorization', 'Bearer ' + accessToken);
			expect(response.statusCode).toBe(404);
		});
	});
});
