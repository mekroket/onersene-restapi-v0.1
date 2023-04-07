//! imports
const Shop = require('../models/shopModel');
const createError = require('http-errors');
const bcrypt = require('bcrypt');




const allShopList = async(req,res)=>{
    const allShop = await Shop.find({});
    res.json(allShop);
}

// get id and get shop
const loginedShopİnfo = async (req,res)=>{
    const selectShop = await Shop.find({_id:req.params.id})
    res.json(selectShop)
}

// const loginedShopUpdate = async (req,res)=>{
//     delete req.body.createdAt;
//     delete req.body.updatedAt;

//     const {error,value} = Shop.joiValidationForUpdate(req.body);
//     if (error) {
//         next(createError(400,error))
//     }else{
//         try {
//             const sonuc = await Shop.findByIdAndUpdate({_id:req.shop._id},req.body,{new:true,runValidators:true})
//             if (sonuc) {
//                 return res.json(sonuc)
//             } else {
//                 return res.satatus(404).json({
//                     mesaj : "Esnaf Bulunamadı"
//                 })
//             }
//         } catch (e) {
//             next(e)
//         }
//     }
// }

const newShop = async (req,res,next) =>{
    try {
        const addShop = new Shop(req.body)
        const {error,value} = addShop.joiValidation(req.body);


        if (error) {
            next(createError(400,error))
        } else {
            const sonuc = await addShop.save();
            res.json(sonuc);
        }
    } catch (error) {
        next(error)
    }
}

const adminUpdateShop = async (req,res,next) =>{
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const {error,value} = Shop.joiValidationForUpdate(req.body)
    
    if (error) {
        next(createError(400,error))
    } else{
        try {
            const sonuc = await Shop.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true,runValidators:true})
            if (sonuc) {
                return res.json(sonuc)
            } else {
                return res.status(404).json({
                    mesaj:"Esnaf bulunamadı"
                })
            }
        } catch (e) {
            next(e);
        }
    }

}

const adminDeleteShop = async (req,res,next)=>{
    try {
        const sonuc = await Shop.findByIdAndDelete({_id:req.params.id});

        if (sonuc) {
            return res.json({
                mesaj:"Esnaf Silindi"
            })
        }else{
            throw createError(404,"Esnaf Bulunamadı")
        }
    } catch (e ){
        next(createError(400,e))
    }
}

module.exports={
    allShopList,
    loginedShopİnfo,
    newShop,
    adminUpdateShop,
    adminDeleteShop
}