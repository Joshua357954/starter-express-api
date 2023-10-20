
module.exports = (sequelize ,DataTypes) => {

	const User = sequelize.define('User',{

		// uid:{
		// 	type:DataTypes.UUID,
		// 	defaultValue:DataTypes.UUIDV4()
		// },
		username:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		email:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},
		
		password:{
			type:DataTypes.STRING(1234),
			allowNull:false
		},

		bio:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},

		job:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},

		school:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},

		location:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},

		profilePix:{
			type:DataTypes.STRING(1234),
			allowNull:true
		},

		coverPhoto:{
			type:DataTypes.STRING(1234),
			allowNull:true
		}

	})

	return User

}