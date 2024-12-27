const mongoose=require('mongoose')

var schemaBook=mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    author:String,
    image:String,
    userId:String
});


var Book= mongoose.model('book',schemaBook)
var url='mongodb://127.0.0.1:27017/books_store'



exports.getThreeBooks=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return Book.find({}).limit(3)
        }).then(books=>{
            mongoose.disconnect()
            resolve(books)

         }).catch(err=>reject(err))
    })


}

exports.getAllBooks=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return Book.find({})
        }).then(books=>{
            mongoose.disconnect()
            resolve(books)

         }).catch(err=>reject(err))
    })

}

exports.getOneBookDetails = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Book.findById(id) 
        }).then(book => {
            mongoose.disconnect();
            resolve(book); 

        }).catch(err => reject(err));
    });
}



exports.postDataBookModel=(title,price,description,author,imageName,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

            let book=new Book({                                       //we use this method instead of insertmany because it returns a promise
                title:title,
                description:description,
                price:price,
                author:author,
                image:imageName,
                userId:userId
            })
            return book.save()

        }).then(()=>{
            mongoose.disconnect()
            resolve('Added !')

        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })

    })
    

}


exports.getMyBooks=(userid)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return Book.find({userId : userid})
        }).then(books=>{
            mongoose.disconnect()
            resolve(books)

         }).catch(err=>reject(err))
    })

}

exports.deleteBook = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Book.deleteOne({_id:id}) 
        }).then(book => {
            mongoose.disconnect();
            resolve(true); 

        }).catch(err => reject(err));
    });
}


exports.updateBookModel=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return Book.findById(id)
        }).then(books=>{
            mongoose.disconnect()
            resolve(books)

         }).catch(err=>reject(err))
    })

}


exports.postDataUpdatedBookModel=(bookId,title,price,description,author,imageName,userId)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

            return Book.updateOne({
                _id:bookId},{
                title:title,
                description:description,
                price:price,
                author:author,
                image:imageName,
                userId:userId
            })

        }).then(()=>{
            mongoose.disconnect()
            resolve('Updated !')

        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })

    })
    

}
