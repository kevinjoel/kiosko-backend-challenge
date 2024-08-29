'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class feeds extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			feeds.belongsToMany(models.User, {
				through: 'user_favorite_feeds',
				as: 'usersWhoFavorited',
				foreignKey: 'feedId',
				otherKey: 'userId',
			});
		}
	}
	feeds.init(
		{
			name: DataTypes.STRING,
			public: DataTypes.BOOLEAN,
			topics: DataTypes.JSON,
		},
		{
			sequelize,
			modelName: 'feeds',
		},
	);
	return feeds;
};
