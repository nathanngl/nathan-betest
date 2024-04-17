const formatResponse = require('../library/formatResponse');

class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async getToken(req, res) {
        try {
            const payload = req.body;
            const token = await this.authService.getToken(payload);
            return formatResponse.ok({ res, message: 'Token generated successfully', data: token });
        } catch (error) {
            return formatResponse.internalError({ res, message: error.message });
        }
    }
}

module.exports = AuthController;