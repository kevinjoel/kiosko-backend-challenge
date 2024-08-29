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
				allowNull: false,
			},
			public: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			topics: {
				type: Sequelize.JSON,
				allowNull: false,
			},
			createdBy: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
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
