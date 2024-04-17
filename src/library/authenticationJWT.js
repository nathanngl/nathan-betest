const jwt = require("jsonwebtoken");

class AuthenticationJWT {
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = process.env.JWT_ACCESS_EXPIRATION_MINUTES;
  }

  async generateToken(payload) {
    try {
      const token = await jwt.sign(payload, this.secret, {
        expiresIn: this.expiresIn * 60,
      });
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyToken(token) {
    try {
      const decoded = await jwt.verify(token, this.secret);
      return decoded;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

module.exports = AuthenticationJWT;
