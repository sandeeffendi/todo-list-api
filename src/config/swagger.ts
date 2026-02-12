import swaggerjsdoc from "swagger-jsdoc";

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const swaggerOptions: swaggerjsdoc.Options = {
  definition: {
    openapi: "3.2.0",
    info: {
      title: "Todo List Simple CRUD API",
      version: "1.0.0",
      description: "API for Todo List Web Application",
    },
    servers: [
      {
        url: `http://${hostname}:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      security: [{ bearerAuth: [] }],
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerjsdoc(swaggerOptions);

export default swaggerSpec;
