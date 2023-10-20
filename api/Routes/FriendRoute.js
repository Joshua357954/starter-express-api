const express = require('express')
const { getMyFriends,
	deleteUserFriend,
	sendFriendRequest,
	acceptFriendRequest,
	getFriendSuggestion,
	getUserFriendRequest,
	deleteSuggestionOrRequest,
} = require('../Controllers/FriendController.js')

const router = express.Router()

router.post('/add',sendFriendRequest)
router.post('/acceptRequest',acceptFriendRequest)
router.get('/getFriendRequests/:userId',getUserFriendRequest)
router.get('/myFriends/:userId',getMyFriends)
router.get('/suggestion/:userId',getFriendSuggestion)
router.post('/deleteUserFriend',deleteUserFriend)
router.post('/deleteSuggestionOrRequest',deleteSuggestionOrRequest)



module.exports=router