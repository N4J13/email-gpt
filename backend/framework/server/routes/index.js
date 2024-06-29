import authMiddleware from "../middlewares/authMiddleware";
import authRoutes from "./authRouter";
import emailRouter from "./emailRouter";

export default function routes(app, express) {
  app.use("/api/v1/auth", authRoutes(express));
  app.use("/api/v1/email", authMiddleware, emailRouter(express));
}
