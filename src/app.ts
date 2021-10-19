import "dotenv/config";
import express, { response } from "express";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(router);

//leva o usuario para pagina de login do github
app.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENTE_ID}`
  );
});

//depois de fazer o login é redirecionado para esse callback que retorna o code do usuario
app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code);
});

app.listen(4000, () => console.log("Server on Port 4000"));
