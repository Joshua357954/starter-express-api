const express= require('express')

const { getUserById, getAllUsers,
	  updateProfile, hashUserPassword,
	  comparePassword } = require('../Controllers/userControllers.js')

const router= express.Router()


router.get('/getUser/:id', getUserById)

router.get('/globalUsers', getAllUsers)

router.post('/updateUserProfile',updateProfile)

router.post('/hashPassword',hashUserPassword)

router.post('/comparePassword',comparePassword)

module.exports=router