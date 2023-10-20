// http://localhost:5001/api/auth/login
// $ curl -d '{'username':"joshua89",'password':"1234567"}' 
// -H 'Content-Type: application/json'

module.exports = (sequelize	,DataTypes) => {

	const Friend = sequelize.define('Friend',{

		accepted:{
			type:DataTypes.BOOLEAN,
			DefaultValue:false
		},

		FriendId:{
			type:DataTypes.STRING(1234),
			allowNull:false
		}

	})
	return Friend
}

