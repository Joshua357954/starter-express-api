
module.exports = (sequelize, DataTypes) => {
	
	const Reaction= sequelize.define('Reaction',{

		// _id:{
		// 	type:DataTypes.STRING(1234),
		// 	allowNull:false
		// },

		// uid:{
		// 	type:DataTypes.UUID,
		// 	defaultValue:DataTypes.UUIDV4
		// },

		reactionUser:{
			type:DataTypes.STRING(1234),
			allowNull:false,
		},

		reactionType:{
			type:DataTypes.ENUM,
			values:['like','love','care','sad','angry','wow','laugh']

		}
	})

	return Reaction
}