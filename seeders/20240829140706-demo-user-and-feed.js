'use strict';
const bcrypt = require('bcrypt');

module.exports = {
	async up(queryInterface) {
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash("z+bS7z8P@@BfMu!LA#'f", saltRounds);

		await queryInterface.bulkInsert(
			'users',
			[
				{
					username: 'kiosko',
					password: passwordHash,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{ returning: true },
		);

		await queryInterface.bulkInsert('feeds', [
			{
				name: 'Kiosko Feed',
				public: true,
				topics: JSON.stringify(['Colima', 'E-commerce', 'Retail', 'Services', 'Stock']),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('feeds', null, {});
		await queryInterface.bulkDelete('users', null, {});
	},
};
