const bookController=require('../controllers/books.controller')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')

router.get('/',GuardAuth.isAuth,bookController.AllBooksController)
router.get('/:id',GuardAuth.isAuth,bookController.getOneBookDetailController)


module.exports=router