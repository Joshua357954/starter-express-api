const express= require('express')
const {
	markAsRead,
	markAllNotifications,
	getUserNotification,
	deleteNotification,
	deleteAllUsersNotification
} = require("../Controllers/NotificationControllers.js")
const router= express.Router()


router.get('/getUser/:userId',getUserNotification)
router.post('/markAsRead',markAsRead)
router.post('/markAllAsRead',markAllNotifications)
router.post('/deleteAll',deleteAllUsersNotification)
router.post('/deleteOne',deleteNotification)


module.exports = router


