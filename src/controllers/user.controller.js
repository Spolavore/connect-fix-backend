import usuarioService from "../services/usuario.service.js";
import httpStatus from "../utils/constants.js";

const criarUsuario = async (req,res) => {
    const cpf = req.body.cpf;
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    if(!cpf || !nome || !email || !senha) return res.status(httpStatus.BAD_REQUEST).send('Falta parâmetros no corpo da requisição');

    try {
        await usuarioService.criarUsuario(cpf, nome, email, senha);
        return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
};

const buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.buscarUsuarios();
        return res.send(usuarios).status(httpStatus.SUCCESS)
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const buscarUsuarioPorEmail = async (req, res) => {
    try {
        const email = req.params.email
        const usuarios = await usuarioService.buscarUsuarioPorEmail(email);
        return res.send(usuarios).status(httpStatus.SUCCESS)
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export default {
    criarUsuario, buscarUsuarios, buscarUsuarioPorEmail
}