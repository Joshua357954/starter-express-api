
module.exports = ( sequelize, DataTypes ) => {

	const Notification = sequelize.define('Notification',{

		title:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		discription:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		link:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		read:{
			type:DataTypes.BOOLEAN,
			defaultValue:false
		},
		type:{
			type:DataTypes.BOOLEAN,
			defaultValue:false	
		},
	})
	return Notification
}













