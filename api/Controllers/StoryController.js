const db = require('../Models/index.js')
const { Op } = require('sequelize')
const Friend = db.Friend
const Stories = db.Story


//  get friends from friends model
//  get only id from friends model
//  Then query the data base and get stories where  userId : { [Op.or]: [friend_ids] } 


// Add Stories
const addStory = async(req,res,next) => {
	const { userId, imageUrl, text} = req.body

	try{
		const addS = await Stories.create({
				text,
				images:imageUrl,
				createdTime: Date.now(),
				expirationTime:Date.now() + 60000 * 60 * 24, 
				UserId:userId
		})
		res.status(200).send({status:true,response:"Story Added Successfully"})
	}
	catch(error){
		console.log(error)
		res.send({status:false,response:"An Error Occured"})
	}


}

// delete stories
const deleteStory = async(req,res,next) => {
	const { storyId, userId } = req.body
	try{
		const deleteS = await Stories.destroy({
				where:{
					id:storyId,
					UserId:userId
				}
		})
		res.status(200).send({status:true,response:"Story Added Successfully"})
	}
	catch(error){
		console.log(error)
		res.send({status:false,response:"An Error Occured"})
	}
	
}

// get users stories
const getUserStories = async(req,res,next) => {
	const {  userId } = req.params

	try{
		const FriendStories = await Friend.findAll({
				where:{
					UserId:userId,
					Accepted:true
				},
				attributes:['FriendId','UserId']
		})
		
		let friend_stories_id = []

		for(let i=0; i < FriendStories.length; i++){ friend_stories_id.push(FriendStories[i].FriendId)}

		const getStories = await Stories.findAll({
				where:{
					UserId:[...friend_stories_id],
				}
		})

		//  classify stories 

		const makeClasico = () => {
			const classified_stories_object = {}

			getStories.forEach((item,idx) => {
				
				if (classified_stories_object[item?.UserId])
					classified_stories_object[item?.UserId].push(item)
				else
					classified_stories_object[item.UserId] = [item]

			})

			return classified_stories_object
		}
		//  ---------- Send Response ----------------


		res.status(200).send({status:true,response:await makeClasico()})
	}
	catch(error){
		console.log(error)
		res.send({status:false,response:"An Error Occured"})
	}	
}



const getPersonalStories = async(req,res,next) => {
	const {  userId } = req.params

	try{
		const getMyStories = await Stories.findAll({
				where:{
					UserId:userId,
				}
			})
		res.status(200).send({status:true,response:getMyStories})
	}
	catch(error){
		console.log(error)
		res.send({error})
	}

}



module.exports = {addStory,deleteStory,getUserStories,getPersonalStories}

