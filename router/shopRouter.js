//! imports
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = require('express').Router();
const shopController = require('../controllers/shopController')

//shop list with admin
router.get('/',[authMiddleware,adminMiddleware],shopController.allShopList);

//add new shop
router.post('/',shopController.newShop);

//shop update
router.patch('/:id',shopController.adminUpdateShop)

//delete shop
router.delete('/:id',shopController.adminDeleteShop)

//shop info
router.get('/:id', shopController.loginedShopİnfo)

module.exports = router;