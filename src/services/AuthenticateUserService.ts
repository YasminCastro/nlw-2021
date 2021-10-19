import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

/*
  Recuperar o code(String)
  Recuperar o access_token no github
  Recuperar infos do user no github
  Verificar se o usuario existe no db
    SIM = Gera um token 
    NAO = Cria o usuario e gera um token 
  Retornar o token com as infos do user
*/

interface IAccessTokenResponse {
  access_token: string;
}
/*Interface: It defines the syntax for classes to follow. 
Classes that are derived from an interface must follow the structure provided by their interface.*/
interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

//Autenticação do usuario
class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENTE_ID,
          client_secret: process.env.GITHUB_CLIENTE_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      });

    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `bearer ${accessTokenResponse.access_token}`,
        },
      }
    );
    const { login, id, avatar_url, name } = response.data;

    //verifica se o usuario existe
    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    //se não existir cria o usuario no db
    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }
    //gerando um token
    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };
