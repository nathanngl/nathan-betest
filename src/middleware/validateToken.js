const AuthenticationJWT = require("../library/authenticationJWT");

module.exports = async (req, res, next) => {
  const authJwt = new AuthenticationJWT();

  let token = req.header("Authorization");
  if (token) {
    token = token.replace("Bearer ", "");
  }

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  try {
    const payload = await authJwt.verifyToken(token);

    // check if token expired
    const currentTime = Date.now() / 1000;
    if (currentTime > payload.exp) {
      return res.status(401).send({ auth: false, message: "Token expired" });
    }

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).send({ auth: false, message: "Unauthorized" });
  }
};
