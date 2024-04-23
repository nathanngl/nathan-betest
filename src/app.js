const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const initDBConnection = require("./config/mongodb");
const redisClass = require("./library/redis");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../apispec.json");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

initDBConnection();
redisClass.init();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Open API Docs at http://localhost:${port}/api-docs`);
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cors());
app.options("*", cors());

app.use(
  "/api-docs",
  function (req, res, next) {
    swaggerDocument.host = req.get("host");
    req.swaggerDoc = swaggerDocument;
    next();
  },
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup()
);

app.use("/api", require("./routes"));
