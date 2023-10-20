const db = require("../Models/index.js")
const { Op } = require('sequelize')
const Friend = db.Friend
const User = db.User
const Post = db.Posts
const Conversation = db.Conversations

// Add Friend to Friend table
// Accept Friend Request
// Get Users Friend Request
// Delete friend


// Send Request
const sendFriendRequest = async(req,res,next)=>{

	const { userId,FriendId } = req.body

	try{
		const sendReq = await Friend.create({
				FriendId,
				accepted:false,
				UserId:userId
		})
		res.send({" Friend Request Sent 😊 ": sendReq})

		const sendReq2 = await Friend.create({
				FriendId:userId,
				accepted:null,
				UserId:FriendId
		})
	}
	catch(error){
		console.log(error)
		res.send({status:false,response:"An Error Occured"})
	}

}
   



//  get Requests
const getUserFriendRequest = async(req,res,next) => {
	const id  = req.params.userId
	console.log("WE just reached this place of reqsss.")
	try{
		const getReqs = await Friend.findAll({
				where:{
					UserId:id,
					accepted:false
				}
		})
		res.status(200).send({status:true,response:getReqs})
	}
	catch(error){
		console.log(error)
		res.send({status:false,response:"An Error Occured"})
	}
}




// Accept Request
const acceptFriendRequest = async(req,res,next) => {
	const { reqId, userId } = req.body
	console.log("These are my vals : ",reqId,userId)
	try{
		const toUpdate = await Friend.findOne({
			where:{ id : reqId }
		})

		console.log("Req to Update : ",toUpdate)

		const acceptReq = await Friend.update({accepted:true},{
				where:{
					id:toUpdate?.id,
					accepted:false
				}
		})

		console.log("Update the Friend Obj : Yo : ",acceptReq)

		res.status(200).send({status:true,response:acceptReq})

		// Add the other user to the other Friend List of friends
		const addToList = await Friend.create({
				FriendId:userId,
				accepted:true,
				UserId:JSON.parse(toUpdate?.FriendId)
		})

		//  Delete Dummy request
		const dummyFriend = await Friend.destroy({
			where:{
				FriendId:userId,
				accepted:null,
				UserId:JSON.parse(toUpdate?.FriendId) 
			}
		})

		console.log("Dummy Friend Deleted : ",dummyFriend,"Dummy Friend Deleted @ 2 :)))")
		console.log("Done Accepting Friend ..",addToList)
	}
	catch(error){
		console.log(error)
		res.send({status:false,response:"An Error Occured"})
	}

}




//  get Friends ...
const getAllFriends = async(userId) => {

	try{
		const getF = await Friend.findAll({
				where:{
					UserId:userId,
					accepted:true,
				}
		})
		return getF
	}
	catch(error){
		console.log(error)
		return {error}
	}
}


const getMyFriends = async(req,res,next) => {
	const { userId } = req.params

	const dFriends = await getAllFriends(userId)

	if (dFriends?.error){
		res.send({status:false,response:"An Error Occured"})
	}
	res.status(200).send({status:true,response:dFriends})
}



//  Friend Suggestion 
const getFriendSuggestion = async(req,res,next) => {
	const { userId } = req.params

	try{
		const FriendsId = await Friend.findAll({where: {UserId:userId},attributes:['id','FriendId']},)
		
		let fId = []
		for(let i=0; i<FriendsId.length; i++){ fId.push(FriendsId[i].FriendId) }

		const getSugg = await User.findAll({
				where:{
					id:{[Op.notIn]:[JSON.parse(userId),...fId],}	
				},
				limit:10,
				attributes:{ exclude:['password','updatedAt','email'] }	
		})

		res.status(200).send({ status:true,response:getSugg })
	}
	catch(error){
		console.log(error)
		res.send({status:false,response:"An Error Occured"})
	}

} 


//  Delete User Friend

const deleteUserFriend = async(req,res,next) => {
	 const { FriendId, userId } = req.body

	 try{
	 	const deleteFriend = await Friend.destroy({
	 			where:{
	 				FriendId:{[Op.or]: [ FriendId, userId ]},
	 				accepted:true,
	 				UserId:{[Op.or]: [ userId, FriendId ]}
	 			}
	 	})
	 	console.log("User Friend Deleted ",deleteFriend)
	 	res.status(200).send({status:true,response:" User Friend Deleted Successfully"})
	 }
	 catch(error){
	 	console.log(error)
	 	res.send({status:false,response:"An Error Occured"})
	 }

}


//  Delete Friend Suggestion Or Request
const deleteSuggestionOrRequest = async(req,res,next) => {
	 const { FriendId, userId } = req.body

	 try{
	 	const deleteFriend = await Friend.destroy({
	 			where:{
	 				FriendId:{[Op.or]: [ FriendId, userId ]},
	 				accepted:{[Op.or]: [ false, null ]},
	 				UserId:{[Op.or]: [ userId, FriendId ]}
	 			}
	 	})
	 	console.log("Friend Deleted ::: ",deleteFriend)
	 	res.status(200).send({status:true,response:"Friend Deleted Successfully"})
	 }
	 catch(error){
	 	console.log(error)
	 	res.send({status:false,response:"An Error Occured"})
	 }

}






module.exports={
	sendFriendRequest,
	getUserFriendRequest,
	acceptFriendRequest,
	getMyFriends,
	deleteSuggestionOrRequest,
	getFriendSuggestion,
	deleteUserFriend,
}



