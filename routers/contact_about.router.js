const Contact_AboutController=require('../controllers/contact_about.controller')
const router=require('express').Router()


router.get('/contact',Contact_AboutController.getContactusPage)
router.get('/about',Contact_AboutController.getAboutusPage)

module.exports=router
