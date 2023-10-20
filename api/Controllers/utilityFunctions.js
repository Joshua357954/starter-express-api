const db = require("../Models/index.js")
const { Op } = require('sequelize')
const User = db.User
const Friend = db.Friend


async function getFriendsId (userId) {

	const d_users_friends = await Friend.findAll({where: {
			UserId:userId,
			Accepted:true,
		},
		attributes:['FriendId']})

	console.log("Utility, Friends ID : ",d_users_friends)

	return d_users_friends
}


async function User_Details (id)  {
	
	try{
		const foundUser = await User.findOne({
				where: {
					[Op.or] : {
						id : id ,
						username : id 
					}
				}
			})
		return foundUser

	}catch(error){
		return (error)
	}
}


module.exports = {
	getFriendsId,
	User_Details
}
