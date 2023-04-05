//! imports
const User = require('../models/userModel');
const createError = require('http-errors');
const bcrypt = require('bcrypt');



const allUserList = async (req,res)=>{
    const allUser = await User.find({});
    res.json(allUser)
}


const loginUserİnfo = (req,res)=>{
    res.json(req.user)
}

const loginUserUpdate = async (req,res)=>{

    delete req.body.createdAt;
    delete req.body.updatedAt;

    const {error,value} = User.joiValidationForUpdate(req.body);
    if (error) {
        next(createError(400,error));
    }else{
        try {
            const sonuc = await User.findByIdAndUpdate({_id:req.user._id},req.body,{new:true,runValidators:true});
            if (sonuc) {
                return res.json(sonuc);
            }else{
                return res.status(404).json({
                    mesaj : "Kullanıcı bulunamadı"
                })
            }
        } catch (e) {
            next(e);
        }
    }

}


const newUserCreate = async(req,res,next)=>{
    try {
        const addUser = new User(req.body);
        const {error,value}= addUser.joiValidation(req.body);

        if (error) {
            next(createError(400,error));
        } else {
            const sonuc = await addUser.save();
            res.json(sonuc)
            
        }
    } catch (err) {
        
    }
}

const login = async (req,res,next)=>{
    try {
        const user = await User.login(req.body.phone);
        const token = await user.generateToken();
        res.json({
            user,
            token
        })
    } catch (hata) {
        next(hata)
    }
}

const adminUserUpdate = async (req,res,next)=>{
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const {error,value} = User.joiValidationForUpdate(req.body);
    if (error) {
        next(createError(400,error))
    }else{
        try {
            const sonuc = await User.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true,runValidators:true})
            if (sonuc) {
                return res.json(sonuc)
            }else{
                return res.status(404).json({
                    mesaj:"kullanıcı bulunamadı"
                })
            }
        } catch (e) {
            next(e)
        }
    }
}

const adminDeleteUser = async (req,res,next)=>{
    
    try {
        const sonuc = await User.findByIdAndDelete({_id:req.params.id})

        if (sonuc) {
            return res.json({
                mesaj:"Kullanıcı silindi"
            })
        }else{
            throw createError(404,"Kullanıcı Bulunamadı")
        }
    } catch (e) {
        next(createError(400,e))
    }
      
}


module.exports = {
    allUserList,
    loginUserİnfo,
    loginUserUpdate,
    newUserCreate,
    login,
    adminUserUpdate,
    adminDeleteUser
}