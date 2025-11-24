import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerRoutes = Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tech4Um API",
      version: "1.0.0",
      description: "Documentação da API do Tech4Um",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/modules/**/http/routes/*.routes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

// Rota: /api-docs
swaggerRoutes.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export { swaggerRoutes };