//! imports
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const errorMiddleware = require('../middleware/errorMiddleware');


// all users in list
router.get('/me',authMiddleware)
