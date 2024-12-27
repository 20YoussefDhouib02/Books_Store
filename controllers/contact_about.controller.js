exports.getContactusPage=(req,res,next)=>{
    res.render('contact',{verifUser:req.session.userId})
}

exports.getAboutusPage=(req,res,next)=>{
    res.render('about',{verifUser:req.session.userId})
}