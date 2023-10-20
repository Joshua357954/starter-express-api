const express= require('express')
const router= express.Router()
const asyncHandler = require('async-handler')
const { register, login, forgotCredentials, confirmPasswordReset } = require("../Controllers/AuthControllers.js")



router.post('/register',register)

router.post('/login',login)

router.post('/validateReset',confirmPasswordReset)

router.post('/forgotPassword',forgotCredentials)


module.exports=router