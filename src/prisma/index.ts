//fazendo conexão com o banco de dados

import { PrismaClient } from ".prisma/client";

const prismaCliente = new PrismaClient();

export default prismaCliente;
