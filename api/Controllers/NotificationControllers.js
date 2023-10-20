const db = require("../Models/index.js")
const Notification = db.Notification

const { getFriendsId } = require('./utilityFunctions.js')

const getUserNotification = async(req,res) => {

	const {userId} = req.params

	try{
		const notifis = await Notification.findAll({
			where:{
				UserId: userId  
			 }
		})
		
		res.status(200).send({status:true,response:notifis})
	}
	catch(error){
		console.log(error)
		res.status(401).send({status:false,response:"An Error Occured"})
	}

}

//  send notification moved to its own file ...


const deleteNotification = async(req,res) => {

	const {userId, notificationId } = req.body

	try{
		const deleteNotify = await Notification.destroy({
			where:{
				id: notificationId,
				UserId:userId
			 }
		})
		
		res.status(200).send({status:true,response:"Delete Notification Successful"})
	}
	catch(error){
		console.log(error)
		res.status(401).send({status:false,response:"An Error Occured"})
	}

}

const deleteAllUsersNotification = async(req,res,next) => {

	const {userId} = req.body

	try{
		const deleteAllNotifys = await Notification.destroy({
			where:{
				UserId:userId
			 }
		})

		res.status(200).send({status:true,response:"Delete Successful"})
	}
	catch(error){
		console.log(error)
		res.status(401).send({status:false,response:"An Error Occured"})
	}

}




async function markAsRead (req,res,next) {
	const { notificationId, userId } = req.body

	try {
		const toMark = await Notification.update({read:true},{
			where:{
				id:notificationId,
				UserId:userId
		}})
		res.send({status:true,response:toMark})
	}
	catch(error){
		console.log(error)
		res.send({error})
	}
}


const markAllNotifications = async(req,res,next) => {

	const {userId} = req.body

	try{
		const readAll = await Notification.update({read:true},{
			where:{
				UserId:userId
			 }
		})

		res.status(200).send({status:true,response:"Update Successful"})
	}
	catch(error){
		console.log(error)
		res.status(401).send({status:false,response:"An Error Occured"})
	}

}



module.exports = {
	markAsRead,
	markAllNotifications,
	getUserNotification,
	deleteNotification,
	deleteAllUsersNotification
}







