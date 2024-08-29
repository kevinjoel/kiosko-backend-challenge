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
		}
	}

	FeedModel.init(
		{
			name: DataTypes.STRING,
			favorite: DataTypes.BOOLEAN,
			public: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'feeds',
		},
	);

	return FeedModel;
};
