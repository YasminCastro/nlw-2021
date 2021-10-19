//Autenticação do token
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

//definindo sub como string
interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  //se o token não existir
  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  //Bearer 101837198237asd12 -> o token vem assim, não queremos o Bearer então fazemos um split para pegar apenas o codigo
  const [, token] = authToken.split(" ");

  try {
    //verificar se o token é valido
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ errorCode: "Token.expired" });
  }
}
