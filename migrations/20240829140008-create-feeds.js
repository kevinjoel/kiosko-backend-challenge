'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('feeds', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			public: {
				type: Sequelize.BOOLEAN,
			},
			topics: {
				type: Sequelize.JSON,
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
	},
	async down(queryInterface) {
		await queryInterface.dropTable('feeds');
	},
};
