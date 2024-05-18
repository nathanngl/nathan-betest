const express = require("express");

const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../apispec.json");
const config = require("../config/config");

router.get("/", (req, res) => {
  res.send("OK");
});

router.use("/users", require("./user"));
router.use("/auth", require("./auth"));

router.use(
  "/api-docs",
  function (req, res, next) {
    swaggerDocument.host = req.get("host");

    if (config.env === "production") {
      swaggerDocument.host = config.appDomain;
    }

    req.swaggerDoc = swaggerDocument;
    next();
  },
  swaggerUi.serveFiles(swaggerDocument, {}),
  swaggerUi.setup()
);

module.exports = router;
