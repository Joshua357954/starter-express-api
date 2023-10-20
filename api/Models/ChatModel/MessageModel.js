
module.exports = (sequelize,DataTypes) => {

	const Messages = sequelize.define('Message',{
		
		// _id:{
		// 	type:DataTypes.STRING(1234),
		// 	allowNull:false
		// },

		// uid:{
		// 	type:DataTypes.UUID,
		// 	defaultValue:DataTypes.UUIDV4
		// },

		SenderId:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},
		
		text:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		imgUrl:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},
		read:{
			type:DataTypes.BOOLEAN,
			defaultValue:false
		}

	})

	return Messages
}
