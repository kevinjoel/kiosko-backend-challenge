'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		// Fetch the user and feed IDs from the database
		const [users] = await queryInterface.sequelize.query(
			`SELECT id FROM Users WHERE username = 'kiosko';`,
		);

		const [feeds] = await queryInterface.sequelize.query(
			`SELECT id FROM Feeds WHERE name = 'Kiosko Feed';`,
		);

		await queryInterface.bulkInsert(
			'user_favorite_feeds',
			[
				{
					userId: users[0].id, // Assuming 'kiosko' user exists
					feedId: feeds[0].id, // Assuming 'Kiosko Feed' feed exists
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('user_favorite_feeds', null, {});
	},
};
