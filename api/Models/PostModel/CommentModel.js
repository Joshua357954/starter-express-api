
module.exports = (sequelize, DataTypes) => {

	const Comments= sequelize.define('Comment',{

		// postUid:{
		// 	type:DataTypes.STRING(1234),
		// 	allowNull:false
		// },
		
		// uid:{
		// 	type:DataTypes.UUID,
		// 	defaultValue:DataTypes.UUIDV4
		// },

		commentUser:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		text:{
			type:DataTypes.STRING(1234),
			allowNull:false
		}

	})
	return Comments
}
