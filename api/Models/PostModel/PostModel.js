

module.exports = (sequelize, DataTypes) => {
	
	const Post= sequelize.define('Post',{

		type:{
			type:DataTypes.STRING(1234),
			defaultValue:"Public",
			allowNull:true
		},

		text:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		imageUrl:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},

		bgColor:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},

		feeling:{
			type:DataTypes.STRING(1234),
			allowNull:true		
		}

	})

	return Post
}