const express = require("express");

const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../apispec.json");
if (process.env.NODE_ENV === "dev") {
  swaggerDocument.host = `localhost:${process.env.PORT}`;
}

router.get("/", (req, res) => {
  res.send("OK");
});

router.use("/users", require("./user"));
router.use("/auth", require("./auth"));

router.use("/api-docs", swaggerUi.serve);
router.get(
  "/api-docs",
  express.static("./node_modules/swagger-ui-dist", { index: false }),
  swaggerUi.setup(swaggerDocument)
);

module.exports = router;
