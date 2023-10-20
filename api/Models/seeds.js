
const db = require("./index.js")
const bcrypt = require("bcrypt")
const SALT=13

function clearDB(){
	db.Messages.sync({force:true})
	db.Conversations.sync({force:true})
	db.PostReaction.sync({force:true})
	db.Comments.sync({force:true})
	db.Posts.sync({force:true})
	db.Friend.sync({force:true})
	db.User.sync({force:true})

}

async function runSeeds(){

	await db.sequelize.sync({force:true})  
 
 	// Users ( Top Level )
	const user1 = await db.User.create({
			id:1,
			username:"joshua",
			email:"jay@yaho.com",
			password:await bcrypt.hash("12345",SALT),
		})

	const user2 = await db.User.create({
			id:2,
			username:"samuel",
			email:"sam@yaho.com",
			password:await bcrypt.hash("12345",SALT),
		})

	const user19 = await db.User.create({
			id:19,
			username:"euzie",
			email:"ele@gmail.com",
			password:await bcrypt.hash("12345",SALT),
		})

	const user32 = await db.User.create({
			id:32,
			username:"okon",
			email:"sam@smatmail.com",
			password:await bcrypt.hash("12345",SALT),
		})

	const user70 = await db.User.create({
			id:70,
			username:"kamsi",
			email:"sam@yaho.com",
			password:await bcrypt.hash("12345",SALT),
		})


	// Conversation
	const conv1 = await db.Conversations.create({
			userid1:user1.id,
			userid2:user2.id,
			UserId:user1.id
	})

	// Post --
	const post1 = await db.Posts.create({
		id:1,
		text:"Hello My People",
		UserId:user1.id
	})

	const comment1 = await db.Comments.create({
		commentUser:user2.id,
		text:'A new too , hey',
		PostId:post1.id
	})

	const reaction1 = await db.PostReaction.create({
		id:1,
		reactionUser:user2.id,
		reactionType:"care",
		PostId:post1.id
	})

	//Add Friend 
	const oneAdd2 = await db.Friend.create({
		id:1,
		accepted:true,
		FriendId:2,
		UserId:user1.id
	})

	const twoAdd19 = await db.Friend.create({
		id:7,
		accepted:true,
		FriendId:19,
		UserId:user1.id
	})

	const twoAdd70 = await db.Friend.create({
		id:10,
		accepted:true,
		FriendId:70,
		UserId:user2.id
	})

	const twoAdd32 = await db.Friend.create({
		id:11,
		accepted:true,
		FriendId:32,
		UserId:user2.id
	})

	//  Stories 
	// const user1story = await db.Story.create({
	// 		id:1,
	// 		images:"User One Story Img Url",
	// 		text:"Nice one brovie .",
	// 		UserId:user1.id
	// })

	// const user2story = await db.Story.create({
	// 		id:2,
	// 		images:"User Two Story Img Url",
	// 		text:"My Life is pure oh.",
	// 		UserId:user2.id
	// })

	// const user32story = await db.Story.create({
	// 		id:21,
	// 		images:"User 32 Story Img Url",
	// 		text:"Be Sure Of Your Salvation.",
	// 		UserId:user32.id
	// })

	// const user19story = await db.Story.create({
	// 		id:8,
	// 		images:"User 19 Story Img Url",
	// 		text:"Be Strong In The Lord",
	// 		UserId:user19.id
	// })


	// const user70story = await db.Story.create({
	// 		id:9,
	// 		images:"User 70 Story Img Url",
	// 		text:"The lord is good all the time.",
	// 		UserId:user70.id
	// })


	// Events
	const user1Event = await db.Events.create({
			id:1,
			name:"User 1 first Event",
			venue:'Facebook Live',
			dateTime:"12/4/23 by 10:35pm",
			discription:"A very blessed event",
			UserId:user1.id
	})

	const user2Events = await db.Events.create({
			id:2,
			name:"User 2 first Event",
			venue:'Whatsapp Live',
			dateTime:"05/9/22 by 11:05pm",
			discription:"Come And Enjoy",
			UserId:user2.id
	})

	const user32Events = await db.Events.create({
			id:3,
			name:"User 32 first Event",
			venue:'Zoom Live',
			dateTime:"07/10/22 by 12:20pm",
			discription:"Come And Enjoy",
			UserId:user32.id
	})

	const conv2 = await db.Conversations.create({
			userid1:71,
			userid2:1,
			UserId:1
	})

	const conv3 = await db.Conversations.create({
			userid1:71,
			userid2:2,
			UserId:2
	})


	// Events
	// Stories


}


runSeeds()


//  get friends from friends model
//  get only id from friends model
//  Then query the data base and get stories where  userId : { [Op.or]: [friend_ids] } 

//  find event base on location 
//  
//  get friends from friends model
//  get only id from story model

//  Then query db get event where { location : { Op.like} : user_location}


 



