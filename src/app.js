const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const initDBConnection = require("./config/mongodb");
const redisClass = require("./library/redis");

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

app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.send("OK");
});
