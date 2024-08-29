'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('user_favorite_feeds', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			feedId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'feeds',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});

		// Ensure that each user can only have one favorite feed
		await queryInterface.addConstraint('user_favorite_feeds', {
			fields: ['userId'],
			type: 'unique',
			name: 'unique_user_favorite_feed',
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('user_favorite_feeds');
	},
};
