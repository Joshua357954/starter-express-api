const db = require("../Models/index.js")
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const User = db.User 
const getUserById = async(req,res,next)=>{

	const { id } = req.params

	if(id ==="" || id===null || id===undefined) 
		return res.status(401).send("id is empty .")

	try{
		const foundUser = await User.findOne({
				where: {
					[Op.or] : {
						id : id ,
						username : id 
					}
				}
			})
		return res.status(200).send({status:true,response:foundUser})
	}
	catch(error){
		res.send(error)
	}

}


const getAllUsers = async(req,res,next) =>{

	// check request headers and other request to be sure its not an outsider
	try{
		const allUsers = await User.findAll()
		console.log(allUsers)
		res.status(200).send({status:true,response:allUsers})
	}
	catch(error){
		console.log(error)
		res.status(400).send({status:false,response:'An error occured'})
	}
}

const updateProfile = async(req,res,next) => {
	const details = req.body
	try{
		const profileToUpdate = User.update(details,
				{
					where:{
						id:details.id
					}
				}
		)

		res.status(200).send({status:true,response:profileToUpdate})

	}catch(error){
		console.log(error)
		res.send({error})
	}
}

let SALT = 13

const hashUserPassword = async(req,res,next) => {
	const { password } = req.body
	try{
		console.log(password)
		const hpassword = await bcrypt.hash(password.toString(),SALT)
		res.status(200).send({response:hpassword})
		console.log(hpassword)

	}catch(error){
		console.log(error)
		res.send({Error:error})
	}
}

const comparePassword = async(req,res,next) => {
	const { hash,password } = req.body
	try{
		console.log(hash,password)
		const comparism = await bcrypt.compare(password,hash)
		res.status(200).send({response:comparism})
		console.log(comparism)

	}catch(error){
		console.log(error)
		res.send({Error:error})
	}	
}


module.exports= { getUserById, getAllUsers, updateProfile, hashUserPassword, comparePassword }

