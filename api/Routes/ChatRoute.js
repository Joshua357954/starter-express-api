const express= require('express')
const { newConversation,findConversation, getUserConversations } = require('../controllers/conversationControllers.js')
const router= express.Router()


// router.get('/',AuthController)
// curl -d '{"userId1":"","userId2":""}' -H '{"Content-type":"application/json"}' "http://localhost:5001/api/chat/create" '

router.post('/create',newConversation)

router.get('/findOne/:user1/:user2',findConversation)

router.get("/findMany/:userId", getUserConversations )

module.exports=router  