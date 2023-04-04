//! db connection page

const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/logApi',{useCreateIndex:true,useUnifiedTopology: true,useNewUrlParser: true})
    .then(()=>console.log("Veritabanına Bağlanıldı"))
    .catch(hata =>console.log("db bağlantısı başarısız"))

//veritananı bağlantısı yapıldı