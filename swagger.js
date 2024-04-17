const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./apispec.json";
const endpointsFiles = ["./src/routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles);
