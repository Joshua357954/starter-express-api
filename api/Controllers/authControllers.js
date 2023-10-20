const SALT=13
const extra_minute = 60000 * 5 
const { v4 } = require('uuid')
const bcrypt = require("bcrypt")
const { sendEmail } = require("./sendMail.js") 
const db = require("../Models/index.js")
const user_model = db.User
const PasswordResetModel = db.passwordReset


const register = async(req,res)=>{
	const {username,email,password,id} = req.body

	if (username=="" || email=="" || password=="") return "Pls Fill The Form Correctly"

	try{
		const checkUser = await user_model.findOne({where:{email:email.toLowerCase()}})
		const checkname = await user_model.findOne({where:{username:username.toLowerCase()}})
		
		if(checkUser || checkname ) return res.json({response:"User already exists"})

		const hashedPassword= await bcrypt.hash(password,SALT)

		const newUser= await user_model.build({id,username,email,password:hashedPassword})
		
		newUser.save()

		res.status(200).send({status:true,response:newUser})

	}catch(err){
		console.log(err)
		return res.json({status:false,response:"An Error Occured",error:err})
	}
}


const login = async(req,res)=>{

	const { username, password }= req.body

	if ( !username || !password || username=="" || password=="" )return res.send("Pls Fill The Form Correctly")

	try {
		const checkUser = await user_model.findOne({where:{'username':username.toLowerCase()}})

		if (!checkUser) return res.send({status:false,response:"User Not Found"})

		const isPasswordCorrect= await bcrypt.compare(password, checkUser.password)
		
		if (!isPasswordCorrect) return res.send({status:false,response:"Incorrect Password"})

		return res.send({status:true, response:checkUser})
	
	}catch(err){

		console.log(err)
		return res.json({status:false,response:"An Error Occured"})
	}
} 



const forgotCredentials = async(req,res,next) => {
	const SALT2 = 10
	const { email } = req.body
	const RANDOM_MULTIPLIER = 4000000

	try{
		const recovered_user = await user_model.findOne({where:{email}})

		if (!recovered_user.id)
			return res.send({status:false,response:`${email} email was not found :)`})
		
		  
		const RANDOM_NUM = Math.floor(Math.random()* RANDOM_MULTIPLIER)

		const hashString = await bcrypt.hash(RANDOM_NUM.toString(),SALT2)

		const resetString = RANDOM_NUM.toString()

		// Reset Link to Send
		const link = `localhost:3000/ForgottenPassword/${resetString}`
		const text_to_send =  `<h1>CODE :  ${resetString} </h1> <br> <br> \
							<a href=${link}>Click On this link to reset password</a>`
		console.log(resetString)

		//  start time & expiration time
		const begining_time = Date.now()
		const expiration_time = Date.now() + extra_minute

		//  Check the is an already made request before making a new one
		const userData = await user_model.findOne({where:{email:email.toLowerCase()}})
		const isRequestAlreadyMade = await PasswordResetModel.findOne({ where:{ UserId:userData?.id } })
		
		// Delete Already made requests
		if (isRequestAlreadyMade){

			 await PasswordResetModel.destroy({where:{ UserId: userData?.id}})

			// res.send({status:false,response:"You Had An Existing Requset,But has been cancelled , A new reset link has been send to your email"})
		}
	
		const creset = await PasswordResetModel.create({
			resetString,
			createdTime: begining_time ,
			expiresAt: expiration_time ,
			UserId : recovered_user.id
		})

		console.log(creset)


		// Sending De Mail
		await sendEmail(email,text_to_send)

		return res.send({status:true,response:`Email was sent to ${email} :), The reset Link expires in 5 minutes`})


	}catch(error){
		console.log(error);
		res.send({error})
	}
}


const confirmPasswordReset = async(req,res,next) => {
	const { id, resetString, newPassword } = req?.body

	try{
		const findUser = await PasswordResetModel.findOne({ where:{ resetString, UserId:id } })

		if (!findUser)
			return res.send({status:false,response:'Invalid Credentials, Check Email for a valid reset Link'})


		const tokenEndTime = findUser.expiresAt

		// Delete Password Reset Model 
		const toDelete = await PasswordResetModel.destroy({
			where:{
				id:findUser.id
			}
		})

		console.log("Logging",tokenEndTime, Date.now(), "Compare : ",tokenEndTime < Date.now())
		
		// check if expired
		if ( Date.now() > tokenEndTime ) {
			return res.send({status:false,response:'Reset Link Expired, Generate a new reset link'})
		
		}
		// hash password to update
		const hashed_password_to_update_with = await bcrypt.hash(newPassword,SALT)
		
		// update password
		const user_password_to_update = user_model.update({password:hashed_password_to_update_with},{
						where:{ id } 
		})


		return res.status(200).send({status:true,response:"You have Successfully Reset You Password"})
	}
	catch(error) {
		console.log(error)
		res.send({status:false,response:error})
	}

} 


 
module.exports={register,login,forgotCredentials,confirmPasswordReset}
