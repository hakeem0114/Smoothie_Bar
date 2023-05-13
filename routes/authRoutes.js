//CRUD routes using express
const {Router} = require('express')
const router = Router()

//MVC  -> controllers for auth
const authController = require('../controllers/authController')


//Sign-up page
router.get('/signup', authController.signup_get);
//Create New User in Database
router.post('/signup', authController.signup_post);


//Login page
router.get('/login', authController.login_get);
//Authenticate Current User
router.post('/login', authController.login_post);

//Logout
router.get('/logout', authController.logout_get);


module.exports = router