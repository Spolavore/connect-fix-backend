import queries from "../queries/auth.queries.js"
import { createHash } from "crypto";

const criarUsuario = async (cpf, nome, email, senha) => {
    try {
        const senhaMD5 = createHash('md5').update(senha).digest('hex');
        return await queries.criarUsuario(cpf, nome, email, senhaMD5); // Exemplo de consultaDS
      } catch (err) {
        console.error(err);
    }
    return;
}

const buscarUsuarios = async () => {
    try {
        return await queries.buscarUsuarios();
      } catch (err) {
        console.error(err);
    }
    return;
}

const buscarUsuarioPorEmail = async (email) => {
    try {
        return await queries.buscarUsuarioPorEmail(email);
      } catch (err) {
        console.error(err);
    }
    return;
}



export default  { criarUsuario, buscarUsuarios, buscarUsuarioPorEmail };