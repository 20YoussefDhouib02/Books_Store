const router=require('express').Router()
const AuthController=require('../controllers/auth.controller')
const body=require('express').urlencoded({extended:true})
const GuardAuth=require('./guardAuth')

router.get('/register',GuardAuth.notAuth,AuthController.getRegisterPage)
router.post('/register',body,AuthController.postRegisterData)

router.get('/login',GuardAuth.notAuth,AuthController.getLoginPage)
router.post('/login',body,AuthController.postLoginData)

router.post('/logout',body,AuthController.logoutFunctionController)


module.exports=router