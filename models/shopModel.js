//! imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema();
const Joi = require('@hapi/joi');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// create shop shema
const shopSchema = new Schema({
    category:{
        type:String,
        trim:true,
        maxlength:20,
        minlength:3,
        required:true
    },
    name : {
        type:String,
        required:true,
        trim:true,
        maxlength:60
    },
    address:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:60
    },
    point:{
        type:Boolean,
        required:true,
        trim:true,
    },
    service:{
        header:{
            type:String,
            required:true,
            trim:true
        },
        section:{
            type:String,
            required:true,
            trim:true,
        },
        price:{
            type:String,
            required:true,
            trim:true,
            maxlength:5
        }
    },
    approved:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    active:{
        type:Boolean,
        default:true
    },
    image:{
        type:String
    }
},{collenction:'shop',timestapms:true});


// shop info joi for rules
const schema = Joi.object({
    category:Joi.string().min(3).max(20).trim(),
    name:Joi.string().min(3).max(20).trim(),
    address:Joi.string().min(3).max(20).trim(),
    service:Joi.string().min(3).max(20).trim()
});

// new shop
shopSchema.methods.joiValidation = function(shopObject){
    schema.required();
    return schema.validate(shopObject);
}


// shop update
shopSchema.statics.joiValidationForUpdate = function (shopObject) {
    return schema.validate(shopObject)
}

// shop info
shopSchema.methods.toJSON = function(){
    const shop = tihs.toObject();
    delete shop._id;
    delete shop.createdAt;
    delete shop.updatedAt;


    return shop;
}

// export model and mongoose
const Shop = mongoose.model('Shop',shopSchema);

module.exports = Shop