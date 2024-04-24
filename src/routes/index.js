const express = require("express");

const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../apispec.json");

router.get("/", (req, res) => {
  res.send("OK");
});

router.use("/users", require("./user"));
router.use("/auth", require("./auth"));

router.use(
  "/api-docs",
  function (req, res, next) {
    swaggerDocument.host = req.get("host");
    req.swaggerDoc = swaggerDocument;
    next();
  },
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup()
);

router.use("/api-docs", swaggerUi.serve);

module.exports = router;
