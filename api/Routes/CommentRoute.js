const express= require('express')
const { commentOnPost, reactOnPost } = require("../Controllers/reactionControllers.js")
const router= express.Router()




router.post('/react',reactOnPost)


module.exports = router