'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class UserFavoriteFeedsModel extends Model {
		static associate(models) {
			this.belongsTo(models.users, {
				foreignKey: 'userId',
				as: 'user',
			});
			this.belongsTo(models.feeds, {
				foreignKey: 'feedId',
				as: 'feed',
			});
		}
	}

	UserFavoriteFeedsModel.init(
		{
			feedId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'feeds',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
		},
		{
			sequelize,
			modelName: 'user_favorite_feeds',
		},
	);

	return UserFavoriteFeedsModel;
};
