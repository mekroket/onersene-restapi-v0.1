
const admin = (req,res,next)=>{
    
    if (req.user && !req.user.isAdmin) {
        return res.status(403).json({
            mesaj:"Yalnızca admin erişebilir."
        })
    }
    next();
}

module.exports = admin;