const express= require('express')
const  {addStory,deleteStory,getUserStories,getPersonalStories} = require("../Controllers/StoryController.js")
const router= express.Router()


router.post('/create',addStory)
router.get('/userStories/:userId',getUserStories)
router.get('/personalStories/:userId',getPersonalStories)
router.post('/delete',deleteStory)
   

module.exports = router


