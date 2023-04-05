//! imports
const express = require('express');
require('./db/dbConnection');
const jwt = require('jsonwebtoken');
const errorMidleware = require('./middleware/errorMiddleware')



//router import
const userRouter = require('./router/userRouter');



//express using
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/users',userRouter)


// error management
app.use(errorMidleware)



app.get('/',(req,res)=>{
    res.status(200).json({mesaj:"hoşgeldiniz (deneme yazısıdır.)"})
})



// jsonwebtoken use
function jsonwebtokenuse(){
    const token = jwt.sign({_userID:'newuserid',isAdmin:true,aktif:true},'123456',{expiresIn:'1h'});
    console.log(token);

    const sonuc = jwt.verify(token,'123456');
    console.log(sonuc);
}

jsonwebtokenuse();




//! server open
app.listen(3000,()=>{
    console.log("Server http://127.0.0.1:3000/ portunu dinliyor.");
})
