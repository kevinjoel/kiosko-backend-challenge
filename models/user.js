'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	class UserModel extends Model {
		static associate(models) {
			this.hasMany(models.user_favorite_feeds, {
				foreignKey: 'userId',
				as: 'favoriteFeeds',
			});
		}
	}

	UserModel.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'users',
		},
	);

	// Hash the password before saving the user
	UserModel.beforeCreate(async (user) => {
		user.password = await bcrypt.hash(user.password, 10);
	});

	UserModel.beforeUpdate(async (user) => {
		if (user.changed('password')) {
			user.password = await bcrypt.hash(user.password, 10);
		}
	});

	UserModel.prototype.validPassword = function (password) {
		return bcrypt.compare(password, this.password);
	};

	return UserModel;
};
