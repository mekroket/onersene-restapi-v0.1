
//hata yakalayıcı
const errorCatcher=(err,res,req,next)=>{

    if (err.code===11000) {
        return res.json({
            mesaj : Object.keys(err.keyValue)+"için girdiğiniz"+Object.values(err.keyValue)+"daha önceden veritabanında olduğu için eklenemez/güncellenemez",
            hataKodu : 400
        });
    }

    if (err.code==66) {
        return res.json({
            mesaj : "Bu alan değiştirilemez",
            hataKodu:400
        });
    }

    res.status(err.statusCode||500);
    res.json({
        hataKodu:err.statusCode||400,
        mesaj:err.message
    })


}


module.exports = errorCatcher;