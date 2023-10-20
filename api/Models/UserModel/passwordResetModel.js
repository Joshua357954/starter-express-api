
module.exports = (sequelize,DataTypes) => {

	const passwordReset = sequelize.define('PasswordReset',{

		resetString:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		createdTime:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		expiresAt:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

	})

	return passwordReset

}
