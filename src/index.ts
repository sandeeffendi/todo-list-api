import express, { type Request, type Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRouter.js";

dotenv.config();
const app = express();
const port = Number.parseInt(process.env.PORT!);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);

app.listen(port, "localhost", () => {
  console.log(`server is running on http://localhost:${port}`);
});
