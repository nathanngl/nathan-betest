class AuthService {
    constructor(AuthenticateJWT) {
        this.AuthenticateJWT = AuthenticateJWT;
    }
    async getToken(payload) {
        try {
            const token = await this.AuthenticateJWT.generateToken(payload);

            return token;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = AuthService;