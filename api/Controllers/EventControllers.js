const db = require('../Models/index.js')
const { Op } = require('sequelize')
const Event = db.Events
const Friend = db.Friend

// Add Event
// Delete Event
// get My Events 

const addEvent = async(req,res,next) => {

	const {title,photoImg,dateTime,location,discription,UserId} = req.body

	try{
		const ev = await Event.create({
			name:title,
			img:photoImg,
			dateTime,
			venue:location,
			discription,
			UserId,
		})
		res.status(200).send({status:true})
	}
	catch(error){
		console.log(error)
		res.send({status:false})
	}

}


const deleteEvent = async(req,res,next) => {
	const { eventId, userId } = req.body

	try{
		const getFind = await Event.findOne({where:{id:eventId,UserId:userId}})

		if (!getFind) return res.send({status:false})

		const dev = await Event.destroy({
				where:{
					id:getFind.id
				}
		})
		setTimeout(() => res.send({status:true,response:"Event Deleted Successfully"}),4000);
		
	}
	catch(error){
		console.log(error)
		res.send({status:false,response:"An Error Occured"})
	}

}

const getOtherEvents = async(req,res,next) => {
	const { venue, userId} = req.params

	try{
		const FindFriendEvent = await Friend.findAll({
			where:{
				UserId:userId,
				Accepted:true
			},
			attributes:['FriendId']
		})
		
		let friendsId = []
		for(let i=0; i<FindFriendEvent.length; i++){ friendsId.push(FindFriendEvent[i].FriendId) }

		const getEventWithLocation = await Event.findAll({
			where:{
				[Op.or]:{
					venue:{ [Op.like]:venue,},
					UserId:[...friendsId]
				},	
			},
		})

		res.status(200).send({status:true,response:getEventWithLocation})
	}
	catch(error){
		console.log(error)
		res.status({status:false,response:"An Error Occured"})
	}

}


const getUserEvents = async(req,res,next) => {
	const { userId } = req.params

	try{

		const YourEvents = await Event.findAll({
			where:{ UserId:userId },
		})

		res.status(200).send({status:true,response:YourEvents})
	}
	catch(error){
		console.log(error)
		res.status({status:false,response:"An Error Occured"})
	}

}



module.exports = { addEvent, deleteEvent, getUserEvents, getOtherEvents }