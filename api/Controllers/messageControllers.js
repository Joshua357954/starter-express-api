const db = require("../Models/index.js")
const Conversation = db.Conversations
const Message = db.Messages


const addMessage = async(req,res,next) =>{
	const {ConversationId,SenderId,text} = req.body
	try{ 

		const newMessage = await Message.create({
			ConversationId,
			SenderId,
			text
		})

		res.status(200).send({status:true,response:"success"})
	}
	catch(err){
		console.log(err)
	}

}


const getMessages = async(req,res,next)=>{
	const conversationId= req.params.convId 
	try{
		const allMsgs = await Conversation.findAll({
			where:{
				id:conversationId
			},
			include:[
				{model:Message}
			]
		})
		console.log(allMsgs)
		res.status(200).send(allMsgs)
	}
	catch(err){
		console.log(err)
	}
}


const markReadUserMessages = async(req,res,next) => {

	const { convId , userId} = req.body 

	if ( !convId || !userId ) return console.log("Empty Values !!!***$$$")

	try{ 
		const toUpdate = await Message.update({read:true},{
			where: {
				ConversationId:convId,
				SenderId:userId
			}
		})	
		res.send({status:true,response:toUpdate})
		
	}catch(error){
		return error
	}  
}


const getConversationLastMessage  = async(req,res,next) => {
	const { convId } = req.params

	console.log("This ia the getConversationMessages controller ...")

	try{
		const lastMsg = await Conversation.findOne({
			where:{
				id:convId
			},
			include:[
				{
					model:Message,
					order:[Message,'createdAt','ASC']
				}				
			]
		})
		console.log("Lamaku",lastMsg)
		res.status(200).send({status:true,response:lastMsg})
	}catch(error){
		console.log(error)
	}

}



module.exports = { addMessage, getMessages, markReadUserMessages, getConversationLastMessage }

