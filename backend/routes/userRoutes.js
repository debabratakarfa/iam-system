const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/user-data', authMiddleware(), userController.getUserData.bind(userController));

module.exports = router;
