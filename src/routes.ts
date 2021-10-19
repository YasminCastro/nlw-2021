import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
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

//traz as 3 ultimas mensagens
router.get("/messages/last3", new Get3LastMessagesController().handler);

//traz o profile do usuario
router.get(
  "/profile",
  ensureAuthenticated,
  new ProfileUserController().handler
);

export { router };
