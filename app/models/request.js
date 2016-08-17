'use strict';

module.exports = function(sequelize, DataTypes) {

	var Request = sequelize.define('Request', {
			title: DataTypes.STRING,
			content: DataTypes.TEXT
		},
		{
			associate: function(models){
				Request.belongsTo(models.User);
			}
		}
	);

	return Request;
};
