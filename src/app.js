const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../apispec.json");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const db = process.env.DB_URI;

console.log(db);

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", require("./routes"));
