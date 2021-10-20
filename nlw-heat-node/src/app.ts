import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";

import { Server } from "socket.io";

import { router } from "./routes";

const app = express();

app.use(cors());
//Em vez do app subir o servidor o http que irá subir. E quando subir o server http, o app tbm vai subir
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Usuario conectado no socket ${socket.id}`);
});

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

export { serverHttp, io };
