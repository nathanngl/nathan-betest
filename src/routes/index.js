const express = require("express");

const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../apispec.json");

router.get("/", (req, res) => {
  res.send("OK");
});

router.use("/users", require("./user"));
router.use("/auth", require("./auth"));

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
