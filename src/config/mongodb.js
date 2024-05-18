require("dotenv").config();
const mongoose = require("mongoose");
const config = require("./config");

module.exports = async () => {
  const uri = config.db.url;

  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    // Check if the database exists, if not, create it
    const db = mongoose.connection.db;
    const dbExists = await db
      .admin()
      .listDatabases({ nameOnly: true })
      .then(({ databases }) =>
        databases.map((db) => db.name).includes(db.databaseName),
      );
    if (!dbExists) {
      console.log("Creating database...");
      await db.createCollection("users"); // Create a collection to create the database
      console.log(`Database '${db.databaseName}' created`);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};
