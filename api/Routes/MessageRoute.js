const express= require('express')
const { addMessage, getMessages, markReadUserMessages, getConversationLastMessage } = require("../Controllers/messageControllers.js")
const router= express.Router()


router.post('/add',addMessage)

router.get('/get/:convId',getMessages)

router.post('/markRead', markReadUserMessages)

router.get('/getLastMessage/:convId', getConversationLastMessage)

// curl -d '{"ConversationId":"325378e1-d1ee-4494-919f-6d76fae42062","SenderId":"18a72d11-cc19-4905-86ec-739c4b8a3cd6","text":"Hey , daniel how are you ."}' -H "Content-Type:application/json" http://localhost:5001/api/message/add/

module.exports=router