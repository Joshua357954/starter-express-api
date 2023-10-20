const { Op } = require('sequelize')
const db = require("../Models/index.js")

const User = db.User
const Conversation = db.Conversations

const newConversation = async(req,res,next) =>{
	const { user,friend,owner } = req.body

	const check = await findInConv(user,friend)

	if( check ){
		res.status(503).json({"message":"Conversation already exists ."})
		return 
	}  

	try{
		const newConv = await Conversation.create({
			userid1:user,
			userid2:friend
		})
		res.status(200).send({status:true, response:"Successful"})
	}
	catch(err){
		console.log(err)
		res.status(400).send({status:false, response:"An Error Occured"})
	}	
}



const findInConv = async(user1,user2) =>{
	
	if (user1 && user2) console.log("Halo")
	else {return console.log("Loop Hole Found in ''Find Conversation''")}
	
	try{
		const conv= await Conversation.findOne({
			where:{
				userid1:{
					[Op.or]:[ user1, user2 ]		
				},
				userid2:{
					[Op.or]:[ user1, user2 ]		
				}
			},
			attributes:['id','userid1','userid2'] 
		})
		console.log(conv)
		return conv
	}
	catch(error){
		return error
		console.log("This is the error message : ",error)
	}
	
}




const findConversation = async(req,res,next)=>{
	const { user1, user2 } = req.params
	console.log(user1,user2)

	if (!user1 || !user2) return console.log("Loop Hole Found in ''Find Conversation''")
	   
	try{
		const newConv = await findInConv(user1,user2)

		res.status(200).send({status:true,response:newConv})
	}
	catch(error){
		console.log("Finding Conversation Controller Ohhh ... : ",error)
	}

}

const getUserConversations = async(req,res,next)=>{
	const userID = req.params.userId
	console.log("This is the user ID : ",userID)
	if (!userID) return console.log("No UserId  '' Get User Conversation '' ")
	
	try{
		const allConv= await Conversation.findAll({
			where:{
				[Op.or]:{
					userid1:userID,
					userid2:userID
				}
			},
		
		})
		console.log(allConv,userID)
		res.status(200).send(allConv)
	}catch(error){
		console.log("Error From Getting Conversation Says Josh : ****",error)
	}
	//  Get All Users id
	//  Query db with id's to get the users in the conversation and send it to 

}




module.exports={ newConversation,findConversation,getUserConversations }

