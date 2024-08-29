'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class user_favorite_feeds extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	user_favorite_feeds.init(
		{
			feedId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'user_favorite_feeds',
		},
	);
	return user_favorite_feeds;
};
