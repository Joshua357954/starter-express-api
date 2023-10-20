const express= require('express')
const  { addEvent, deleteEvent, getOtherEvents, getUserEvents } = require("../Controllers/EventControllers.js")
const router= express.Router()


router.post('/create',addEvent)
router.get('/get/:venue/:userId',getOtherEvents)
router.get('/myEvents/:userId',getUserEvents)
router.post('/delete',deleteEvent)


module.exports = router
