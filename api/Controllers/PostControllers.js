const db = require("../Models/index.js")
const Post = db.Posts
const User = db.User
const Friend = db.Friend
const Comment = db.Comments
const Reaction = db.PostReaction
const { User_Details } = require('./utilityFunctions.js')
const { sendNotification, generatePostNotificationProps } = require('./sendNotification.js')

//  requires authentication ( only registred users kinda ..)


const getPost = async(req,res,next)=>{
		const {postId} = req.params

	if (!postId) return res.status(501).send("postId is empty .")

	try{
		const foundPost = await Post.findAll({
			where:{
				'id':postId
			},
			include:[
				{ model:Comment },	
				{ model:Reaction }
			]		
			  	// include = { comment and reaction }
		})
		console.log("Yes Foound It ",foundPost)
		res.status(200).json({status:true,response:foundPost})

	}
	catch(error){
		res.status(400).send(error)
	}
}


const getAllUserPost = async(req,res,next)=>{

	const {userId} = req.params

	if (!userId) return res.status(501).send("userId is empty .")

	try{
		const foundPost = await User.findAll({
				where:{
					id:userId
				},
				attributes:['id','username','bio','profilePix'],
				include:[ 
					{
						model:Post,
						include:[{model:Comment},{model:Reaction}],
						order:[[Post, 'createdAt', 'ASC']]
					}
				]

			})
		res.send({status:true,response:foundPost})
	}
	catch(error){
		console.log(error)
		res.status(400).send(error)
	}

}

//  find friends post
const getFriendsPost = async(req,res,next) => {
	const { userId } = req.params

	try{
		const FriendPost = await Friend.findAll({
				where:{
					UserId:userId,
					Accepted:true
				},
				attributes:['FriendId']
		})
		
		let friendsPostId = []
		for(let i=0; i<FriendPost.length; i++){ friendsPostId.push(FriendPost[i].FriendId) }

		const getPost = await Post.findAll({
				where:{
					UserId:[userId,...friendsPostId],
				}
		})
		res.status(200).send({status:true,response:getPost})
	}
	catch(error){
		console.log(error)
		res.send({status:false,response:"An Error Occured"})
	}	
}



//  Create New Post 
const newPost = async(req,res,next) => {
	console.log("Posting ohhh")

	const {UserId,type,bgColor,feeling,imgName,imageUrl,text} = req.body

	// console.log(userId,text)
	try{
		const createdPost = await Post.create({
				text,
				type,
				UserId,
				bgColor,
				feeling,
				imgName,
				imageUrl		
		})
		console.log(createdPost)

		res.status(200).send({createdPost})

		const notification_data = await generatePostNotificationProps(UserId, feeling)

		//  Sending the Post Notification
		sendNotification(notification_data)
		console.log("Notification Sent")
		
	}
	catch(error){
		console.log(error)
	}
}


// Delete Post

const deletePost = async(req,res,next) => {
	const { postId , userId } = req.body

	try{
		console.log("Credentials for delete post : ",postId,userId)
		const dPost = await Post.findOne({where:{id:postId}})
		console.log("This is the post found : ", dPost)
		if (dPost.UserId != userId) return res.send({status:"UnAuthourized"})

		const postToDelete = await Post.destroy({
							where:{
								id:postId
							}
					})
		console.log(postToDelete)
		res.status(200).send({status:true,response:"Successfully Deleted"})
	}
	catch(error){
		console.log(error)
		res.status(401).send({status:false,response:error})
	}

}


module.exports = {newPost,getPost,getAllUserPost,getFriendsPost,deletePost}



