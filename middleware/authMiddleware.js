//! imports
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


// auth and token control
const auth = async (req,res,next)=>{

    try {
        if (req.header('Authorization')) {
            const token = req.header('Authorization').replace('Bearer ','');
            const sonuc = jwt.verify(token,'secretkey');
            
            const findUser = await User.findById({_id:sonuc._id});
            if (findUser) {
                req.user = findUser;
            } else {
                throw new Error('Lütfen Giriş Yapınız')
            }
            next();
        } else {
            throw new Error('Lütfen Giriş Yapınız')
        }
    } catch (e) {
        next(e)
    }
}




module.exports = auth;