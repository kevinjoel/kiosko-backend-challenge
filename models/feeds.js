'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class FeedModel extends Model {
		static associate(models) {
			// Define associations here
			this.hasMany(models.user_favorite_feeds, {
				foreignKey: 'feedId',
				as: 'favoriteUsers',
			});
			// Add association with the User model
			this.belongsTo(models.users, {
				foreignKey: 'createdBy',
				as: 'creator',
			});
		}
	}

	FeedModel.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			topics: {
				type: DataTypes.JSON,
				allowNull: false,
			},
			public: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			createdBy: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'feeds',
		},
	);

	return FeedModel;
};
