const express= require('express')
const { reactOnPost } = require("../Controllers/reactionControllers.js")
const router= express.Router()



router.post('/react',reactOnPost)


module.exports = router