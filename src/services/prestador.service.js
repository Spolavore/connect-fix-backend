import queries from "../queries/prestador.queries.js"
import { createHash } from "crypto";

const criar = async (cpf, nome, email, senha, profissao, cep, cidade,estado) => {
    try {
        const senhaMD5 = createHash('md5').update(senha).digest('hex');
        return await queries.criar(cpf, nome, email, senhaMD5, profissao, cep, cidade, estado);
      } catch (err) {
        console.error(err);
    }
    return;
}

const buscar = async () => {
    try {
        return await queries.buscar();
      } catch (err) {
        console.error(err);
    }
    return;
}

const buscarPorEmail = async (email) => {
    try {
        return await queries.buscarPorEmail(email);
      } catch (err) {
        console.error(err);
    }
    return;
}

export default  { criar, buscar, buscarPorEmail };
