import authController from "../../../controllers/authController";
import userRepositoryDB from "../../database/postgresql/repositories/userRepositoryDB";
import authMiddleware from "../middlewares/authMiddleware";

export default function authRoutes(express) {
  const router = express.Router();

  const controller = authController(userRepositoryDB());

  router.get("/google", controller.initializeGoogleAuth);
  router.get("/google/callback", controller.googleAuthCallback);
  router.get("/user", authMiddleware, controller.getUser);
  router.get("/logout", authMiddleware, controller.logout);

  return router;
}
