import { createHash } from "crypto";

import queries from "../queries/solicitador.queries.js"

const criar = async (cpf, nome, email, senha) => {
    try {
        const senhaMD5 = createHash('md5').update(senha).digest('hex');
        return await queries.criar(cpf, nome, email, senhaMD5); // Exemplo de consultaDS
      } catch (err) {
        throw err;
    }
}

const buscar = async () => {
    try {
        return await queries.buscar();
      } catch (err) {
        console.error(err);
    }
}

const buscarPorEmail = async (email) => {
    try {
        return await queries.buscarPorEmail(email);
      } catch (err) {
        console.error(err);
    }
}
const buscarPorCPF = async (cpf) => {
  try {
      return await queries.buscarPorCPF(cpf);
    } catch (err) {
      console.error(err);
  }
}

export default { criar, buscar, buscarPorEmail, buscarPorCPF };
