//! imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const Joi = require('@hapi/joi');


//User Schema

const UserSchema = new Schema({
    name: {
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:50
    },
    surname:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    phone:{
        type:Number,
        required:true,
        trim:true,
        minlength:11,
        maxlength:11,
        unique:true
    },
    country:{
        type:String,
        required:true,
        maxlength:15,
        minlength:2,
        trim:true,
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        minlength:10,
        trim:true,
        maxlength:60
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{collection:'noadminuser',timestapms:true});



// shema rules
const schema = Joi.object({
    name : Joi.string().min(2).max(50).trim(),
    surname : Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    phone : Joi.string().min(11).max(11).trim(),
    country: Joi.string().min(2).max(50).trim(),
    gender : Joi.string().min(5).max(5).trim(),
    address: Joi.string().min(2).max(100).trim(), 

})



// joi use and new user 
UserSchema.methods.joiValidation = function(userObject){
    schema.required();
    return schema.validate(userObject);
}





// use jsonwebtoken
UserSchema.methods.generateToken = async function(){
    const loginUser = this;
    const token = await jwt.sign({_id:loginUser._id},'secretkey',{expiresIn:'1h'});
    return token;
}




// user info page
UserSchema.methods.tojSON = function(){
    const user = this.toObject();
    delete user._id;
    delete user.createdAt;
    delete user.updateAt;

    return user;

};

// login page
UserSchema.statics.login = async (phone)=>{
    const {error,value} = schema.validate({phone});
    if (error) {
        
        throw createError(400,error);
    }

    const user = await User.findOne({phone});
    if (!user) {
        throw createError(400,"Girilen telefon numarası yanlış");
    }

    return user;
}


// user update
UserSchema.statics.joiValidationForUpdate = function(userObject){
    return schema.validate(userObject);
}





// user out other file
const User = mongoose.model('User',UserSchema);

module.exports = User