

module.exports = ( sequelize, DataTypes ) => {

	const Event = sequelize.define('Event',{

		name:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		img:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},

		venue:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},
		
		dateTime:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		discription:{
			type:DataTypes.TEXT,
			allowNull:false 
		}

	})
	return Event

}