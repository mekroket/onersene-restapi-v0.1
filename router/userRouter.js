//! imports
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = require('express').Router();
const userController = require('../controllers/userController')


// all users in list just admin
router.get('/',[authMiddleware,adminMiddleware],userController.allUserList)

// user get token and user control for login
router.get('/me',authMiddleware,userController.loginUserİnfo)


// changes
router.get('/me',authMiddleware,userController.loginUserİnfo,AdminUserİnfo)

// changes2
router.get('/me',authMiddleware,userController.loginUserİnfo)

// logined user update
router.patch('/me',authMiddleware,userController.loginUserUpdate)

//create new user
router.post('/',userController.newUserCreate)

// with user id admin update
router.patch('/:id',userController.adminUserUpdate)

// login
router.post('/login',userController.login)

//admin user delete
router.delete('/:id',[authMiddleware,adminMiddleware],userController.adminDeleteUser)


module.exports = router


