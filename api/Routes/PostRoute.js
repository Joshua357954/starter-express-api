const express= require('express')
const { newPost, getPost, getAllUserPost, getFriendsPost, deletePost} = require("../Controllers/PostControllers.js")
const { reactOnPost, updateReaction } = require("../Controllers/reactionControllers.js")
const { commentOnPost, deleteComment } = require("../Controllers/commentControllers.js")

const router= express.Router()

router.post('/newPost',newPost)
router.get('/getPost/:postId',getPost)
router.get('/getAllUserPost/:userId',getAllUserPost)
router.post('/deletePost',deletePost)

router.get('/friendsPost/:userId',getFriendsPost)

router.post('/comment',commentOnPost)
router.post('/deleteComment', deleteComment)

router.post('/react',reactOnPost)
router.post('/updateReaction',updateReaction)

// $ curl -d '{"ConversationId":"325378e1-d1ee-4494-919f-6d76fae42062","SenderId":"18a72d11-cc19-4905-86ec-739c4b8a3cd6","text"Hey , daniel how are you ."}' -H "C "Cntent-Type:application/json" http://localhost:5001/api/message/add/



module.exports=router