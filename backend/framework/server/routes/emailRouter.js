import emailController from "../../../controllers/emailController";
import emailServices from "../../services/emailServices";
import lanchainService from "../../services/lanchainService";

export default function emailRouter(express) {
  const router = express.Router();

  const controller = emailController(emailServices(), lanchainService());

  router.get("/inbox", controller.getInbox);
  router.get("/sent", controller.getSent);
  router.get("/drafts", controller.getDrafts);
  router.get("/trash", controller.getTrash);

  return router;
}
