
module.exports = (sequelize, DataTypes) =>{

	const conversation = sequelize.define('Conversation',{

		userid1:{
			type:DataTypes.STRING(1234),
			allowNull:false,
		},

		userid2:{
			type:DataTypes.STRING(1234),
			allowNull:false,
		}
	})

	return conversation

}


