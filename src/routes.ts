import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

//cria a rota para a autenticação do usuario
router.post("/authenticate", new AuthenticateUserController().handler);

//rota de mensagem para usuario
router.post(
  "/messages",
  ensureAuthenticated,
  new CreateMessageController().handler
);

export { router };
