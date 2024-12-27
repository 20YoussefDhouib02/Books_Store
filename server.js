const express=require('express')
const path=require('path')
const RouterHome=require('./routers/home.router')
const RouterBook=require('./routers/books.router')
const RouterBookconfig=require('./routers/booksconfig.router')
const RouterAuth=require('./routers/auth.router')
const RouterContact_About=require('./routers/contact_about.router')
const session=require('express-session')
const MongoDbStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')


const app=express()



app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')


var Store=new MongoDbStore({
    uri:'mongodb://127.0.0.1:27017/books_store',
    collection: 'sessions'
})

app.use(flash())

app.use(session({
    secret:'this my secret key',
    // cookie:{
    //     maxAge: 1000*3600              means one day long (default: by closing browser)
    // }
    store: Store,
    resave: true,
    saveUninitialized: true
}))


app.use('/',RouterHome)
app.use('/books',RouterBook)
app.use('/',RouterAuth) 
app.use('/',RouterContact_About)
app.use('/',RouterContact_About)
app.use('/',RouterBookconfig)
app.use('/',RouterBookconfig)


// app.get('/books',(req,res,next)=>{
//     res.render('books')
// })

// app.get('/contact',(req,res,next)=>{
//     res.render('contact',{verifUser:req.session.userId})
// })

// app.get('/about',(req,res,next)=>{
//     res.render('about',{verifUser:req.session.userId})
// })

// app.get('/login',(req,res,next)=>{
//     res.render('login')
// })


// app.get('/books/:id',(req,res,next)=>{
//     res.render('details')
// })


// app.get('/addbook',(req,res,next)=>{
//     res.render('addbook',{verifUser:req.session.userId})
// })

// app.get('/mybooks',(req,res,next)=>{
//     res.render('mybooks',{verifUser:req.session.userId})
// })


app.get('/dashboard',(req,res,next)=>{
    res.render('dashboard',{verifUser:req.session.userId})
})

app.get('/datatables',(req,res,next)=>{
    res.render('datatables',{verifUser:req.session.userId})
})


app.listen(3000,()=>{console.log('server run in port 3000')})