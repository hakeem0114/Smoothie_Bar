//CRUD routes using express
const {Router} = require('express')
const router = Router()

//MVC  -> controllers for auth
const authController = require('../Controllers/authController')


//Get sign-up page
router.get('/signup',authController.signup_get )

//Get Login page
router.get('/signup',authController.login_get )


//Create New User in Database
router.post('/login',authController.login_post)

//Authenticate Current User
router.post('/login',authController.signup_post)


module.exports = router