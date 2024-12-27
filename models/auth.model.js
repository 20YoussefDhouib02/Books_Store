const mongoose=require('mongoose')
const bcrypt=require('bcrypt')



var schemaAuth=mongoose.Schema({
    name:String,
    email:String,
    password:String,
});


var userModel= mongoose.model('user',schemaAuth)
var url='mongodb://127.0.0.1:27017/books_store'



exports.registerFunctionModel=(name,email,password)=>{
   
    return new Promise  ((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            
            return userModel.findOne({email:email})
        
        }).then((foundUser)=>{
                            if(foundUser){
                                mongoose.disconnect()
                                reject('This email is used')
                            }else{
                                return bcrypt.hash(password,10)
                            }   

        }).then((hpassword)=>{
                             let newUser= new userModel({
                                name:name,
                                email:email,
                                password:hpassword
                             })
                             return newUser.save()

        }).then((user)=>{
            mongoose.disconnect()
            resolve('registred!')

        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })

       
    })

}



exports.loginFunctionModel=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

            return userModel.findOne({email:email})

        }).then((foundUser)=>{
            if(foundUser){
                bcrypt.compare(password,foundUser.password).then((verif)=>{
                    if (verif){
                        mongoose.disconnect()
                        resolve(foundUser._id)
                    }else{
                        mongoose.disconnect()
                        reject('Invalid password')
                    }
                })
            }else{
                mongoose.disconnect()
                reject("This email is not registered")
            }
        }).catch(()=>{
            reject(err)
        })
    })


}