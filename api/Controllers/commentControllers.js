const db = require("../Models/index.js")
const Comment = db.Comments

// Comment
const commentOnPost = async(req,res,next) =>{
	const { PostId, text, commentUser } = req.body

	try{
		const newComment = await Comment.create({
										text,
										PostId,
										commentUser
								})
		res.status(200).send({response:newComment})
	}
	catch(error){
		console.log(error)
	}

}

// Delete Comment
let msg = "Successfully Deleted Comment"

const deleteComment = async(req,res,next) => {
	const {commentId, ownerId} = req.body

	try{
		const commentOwner = await Comment.findOne({where:{commentUser: ownerId }})
		
		if (!commentOwner || parseInt(commentOwner.commentUser)  != ownerId){ 
			return res.send({status:"UnAuthourized"})
		}
		const commentToDelete = Comment.destroy({
							where:{
								id:commentId
							}
					})
		console.log("DEleting Comment : ",commentToDelete)
		res.status(200).send({status:true,response:msg})
	}
	catch(error){
		console.log(error)
		res.status(401).send({status:false,response:"An Error Occured"})
	}


}


module.exports= { commentOnPost, deleteComment }