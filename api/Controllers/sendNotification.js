const db = require("../Models/index.js")
const Notifiction = db.Notification
const { getFriendsId, User_Details } = require('./utilityFunctions.js')


//  Construct the notification props
// generatePostNotificationProps
async function generatePostNotificationProps (userId,feeling) {

	if ( !userId ) return console.log("Incomplete Credentials")
	// Generate ( : ))
	const type = "Post"
	const D_User = await User_Details(userId)
	const title = `New Post From ${D_User.username}`
	const discription = `${D_User.username} ${feeling ? `is Feeling ${feeling}` : "Shared A Post"}`
	const _data = { title, discription, link:"", type, sender_id:userId}
	
	
	return _data  
}





//  Main Notification sending functionality ...

const sendNotification = async(props) => {
	
	const { title, discription, link, type, sender_id } = props

	try{
		
		const user_friends = await getFriendsId(sender_id)

		// Check if user has any friend
		if (!user_friends) return res.send("No Friends")
		
		const users_notification = user_friends.map((person_id) => {
			console.log("Map Friend Id : ",person_id)
			return {title,discription,link,type,UserId:person_id.FriendId }
		})

		console.log("SENDING Notifications To : ",users_notification)

		//  Create the notifications
		const makeNotify = await db.Notification.bulkCreate(
					[...users_notification]
			)

		console.log("Notification Sent ...")
		return true
	}

	catch(error){
		console.log(error)
		return false   
	}
}

module.exports = {
	sendNotification,
	generatePostNotificationProps,
}

