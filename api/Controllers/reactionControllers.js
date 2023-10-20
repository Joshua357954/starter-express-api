const db = require("../Models/index.js")
const Reaction = db.PostReaction

//  Reaction

const reactionCount = async(PostId) => {
	const Counting = await Reaction.findAll({where:{PostId}})
	console.log("Reaction Count This Is : ",Counting.length)
	return Counting.length
}

const reactOnPost = async(req,res,next) => {
	const {PostId,reaction,reactionUser} = req.body

	try{

		const check = await Reaction.findOne({where: {reactionUser,PostId}})
		// Check if users has Reacted .
		console.log(check)
		if (check){
			const deleteReaction = await Reaction.destroy({
										where:{
											id: check.id
										}
								})

			res.send({count:await reactionCount(PostId)})
			return
		}
		else{
			const reactedOn = await Reaction.create({
							reactionUser,
							reactionType:reaction,
							PostId
						})
			// console.log(reactionCount())
			res.status(200).send({count:await reactionCount(PostId)})
		}
	}

	catch(error){
		console.log(error)
		res.status(401).send(error)
	}

}

// *********************************************
const updateReaction = async(req,res,next) => {
	const { PostId, reactionUser, reaction } = req.body

	try{
		const reactionToUpdate = await Reaction.findOne({where:{reactionUser,PostId}})

		if(reactionToUpdate){
			const newUpdate = await Reaction.update({reactionType:reaction},{
				where:{
					reactionUser:reactionToUpdate.reactionUser
				}
			})

			res.status(200).send({count: await reactionCount(PostId),status:true,response:newUpdate})
			return
		}

		const makeReaction = await Reaction.create({
						reactionUser,
						reactionType:reaction,
						PostId
			})
		res.status(200).send({count:await reactionCount(PostId),status:true,response:makeReaction})
	}
	catch(error){
		console.log(error);
		res.status(401).send({status:false,response:"An Error Occured"})
	}
}


module.exports = { reactOnPost, updateReaction }

