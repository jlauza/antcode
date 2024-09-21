const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API testing kit.",
    },
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

module.exports = swaggerJSDoc(options);
