const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Authorization = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/update', Authorization, userController.updateUser);
router.delete('/delete', Authorization, userController.deleteUser);

module.exports = router;
