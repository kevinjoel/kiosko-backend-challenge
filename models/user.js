'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here

			user.belongsToMany(models.Feed, {
				through: 'user_favorite_feeds',
				as: 'favoriteFeeds',
				foreignKey: 'userId',
				otherKey: 'feedId',
			});
		}
	}

	user.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'user',
		},
	);

	return user;
};
