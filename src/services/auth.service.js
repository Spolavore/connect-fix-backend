import queriesPrestador from "../queries/prestador.queries.js"
import queriesSolicitador from "../queries/solicitador.queries.js"

import jwt from "jsonwebtoken"
const realizarLogin = async (email,senha,ehPrestador) => {
    try {
        if(ehPrestador){
            return await login(email, senha, 'prestador');
        }
        else{
           return await login(email,senha, 'solicitador')
        }
    } catch (error) {
        console.error(error.message);
        throw new Error (error.message);
    }
}

const login = async(email, senha, tipo) => {
    const info = tipo === 'prestador' ?  await queriesPrestador.buscarPorEmail(email) : await queriesSolicitador.buscarPorEmail(email);
    if(!info) {
        throw new Error("Nenhum usuário com esse e-mail");
    } 
    else if(info.senha !== senha) {
        throw new Error("Senha incorreta");
    }
    else {
        const ehPrestador = tipo === 'prestador';
        return criarUserToken(info,ehPrestador);
    }
}


const criarUserToken = (data, ehPrestador) => {
    delete data.senha
    data.prestador = ehPrestador;
    const token = jwt.sign(data, 'secret', { expiresIn: '3h' })
    return token;
}

export default {
    realizarLogin
}