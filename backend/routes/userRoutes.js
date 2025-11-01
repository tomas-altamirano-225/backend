const express = require('express');
const router = express.Router();
const {login, register, data} = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

//endpoints publicos
router.post('/login', login);
router.post('/register', register);

//endpoints privados
router.get('/data', protect, data);

module.exports = router;