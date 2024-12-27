const bookController=require('../controllers/booksconfig.controller')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')
const multer=require('multer')
const body=require('express').urlencoded({extended:true})


router.get('/addbook',GuardAuth.isAuth,bookController.getAddBookController)
router.post('/addbook',multer({
    storage:multer.diskStorage({
        destination: function (req,file,cb)  {
            cb(null,'assets/uploads')
        },
        filename: function(req,file,cb) {
            cb(null,Date.now() +'-'+ file.originalname )
        }
    })
}).single('image'),GuardAuth.isAuth,bookController.postAddBookController)



router.get('/mybooks',GuardAuth.isAuth,bookController.getMyBooksController)

router.post('/mybooks/delete/:id',body,GuardAuth.isAuth,bookController.deletebookController)

router.get('/mybooks/update/:id',GuardAuth.isAuth,bookController.updateBookController)

router.post('/mybooks/update',multer({
    storage:multer.diskStorage({
        destination: function (req,file,cb)  {
            cb(null,'assets/uploads')
        },
        filename: function(req,file,cb) {
            cb(null,Date.now() +'-'+ file.originalname )
        }
    })
}).single('image'),GuardAuth.isAuth,bookController.postUpdatedBookController)





module.exports=router