const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const initDBConnection = require("./config/mongodb");
const redisClass = require("./library/redis");
const KafkaPubSub = require("./library/kafkaPubSub");
const commands = require("./commands");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  console.log(`Open API Docs at /api/api-docs`);

  await initDBConnection();
  await redisClass.init();
  await KafkaPubSub.init();

  await commands();
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
