const express = require('express');
const router = express.Router();

const AuthenticationJWT = require('../library/authenticationJWT');
const AuthService = require('../services/authService');
const AuthController = require('../controllers/authController');

const authenticationJWT = new AuthenticationJWT();
const authSercvice = new AuthService(authenticationJWT);
const authController = new AuthController(authSercvice);

router.post('/getToken', async (req, res, next) => {
    try {
        await authController.getToken(req, res);
    } catch (error) {
        next(error)
    }
})

module.exports = router;