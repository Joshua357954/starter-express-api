

module.exports = ( sequelize, DataTypes ) => {

	const Story = sequelize.define('Story',{

		images:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},

		text:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},

		createdTime:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		expirationTime:{
			type:DataTypes.STRING(1234),
			allowNull:false
		}

	})

	return Story
}




