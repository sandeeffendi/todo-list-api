import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { connectDb } from "./config/database.js";
import swaggerSpec from "./config/swagger.js";
import authRoutes from "./routes/authRouter.js";

dotenv.config();
const app = express();
const port = Number.parseInt(process.env.PORT!);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);

app.listen(port, "localhost", () => {
  console.log(`server is running on http://localhost:${port}`);
});

connectDb();
