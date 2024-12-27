const bookModel=require('../models/model')



exports.getAddBookController=(req,res,next)=>{
    res.render('addbook',{verifUser:req.session.userId,Smessage:req.flash('Successmessage')[0],Emessage:req.flash('Errormeessage')[0]})
}

exports.postAddBookController=(req,res,next)=>{
    bookModel.postDataBookModel(req.body.title,req.body.price,req.body.description,req.body.author,req.file.filename,req.session.userId).then((msg)=>{
        req.flash('Successmessage',msg)  
        res.redirect('/addbook')   

    }).catch((err)=>{
        console.log('Errormeessage',err)
        res.redirect('/addbook') 
    })
}

exports.getMyBooksController=(req,res,next)=>{
    bookModel.getMyBooks(req.session.userId).then((books)=>{
        res.render('mybooks',{verifUser:req.session.userId, mybooks:books,Smsg:req.flash('Successmessage')[0],Emsg:req.flash('Errormeessage')[0]})
    })

}

exports.deletebookController=(req,res,next)=>{
    let id=req.body.bookId
    bookModel.deleteBook(id).then((verif)=>{
        res.redirect('/mybooks')
    }).catch((err)=>{
        console.log(err)
    })
}


exports.updateBookController=(req,res,next)=>{

    let id=req.params.id
    bookModel.updateBookModel(id).then((book)=>{
        res.render('updatebook',{verifUser:req.session.userId,updateBook:book})

    })
    
}

exports.postUpdatedBookController=(req,res,next)=>{
    if(req.file){
        bookModel.postDataUpdatedBookModel(req.body.bookId,req.body.title,req.body.price,req.body.description,req.body.author,req.file.filename,req.session.userId).then((msg)=>{
            req.flash('Successmessage',msg)  
            res.redirect('/mybooks')   
    
        }).catch((err)=>{
            console.log('Errormeessage',err)
            res.redirect('/mybooks') 
        })
    }else{
        bookModel.postDataUpdatedBookModel(req.body.bookId,req.body.title,req.body.price,req.body.description,req.body.author,req.body.oldImage,req.session.userId).then((msg)=>{
            req.flash('Successmessage',msg)  
            res.redirect('/mybooks')   
    
        }).catch((err)=>{
            console.log('Errormeessage',err)
            res.redirect('/mybooks') 
        })
    }
}