import solicitadorService from "../services/solicitador.service.js";
import httpStatus from "../utils/constants.js";

const criar = async (req,res) => {
    const cpf = req.body.cpf;
    const email = req.body.email;
    const nome = req.body.nome; 
    const senha = req.body.senha;

    if(!cpf || !email || !nome || !senha ) return res.status(httpStatus.BAD_REQUEST).send('Falta parâmetros no corpo da requisição');

    try {
        await solicitadorService.criar(cpf, nome, email, senha);
        return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
};

const buscar = async (req, res) => {
    try {
        const usuarios = await solicitadorService.buscar();
        return res.send(usuarios).status(httpStatus.SUCCESS)
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const buscarPorEmail = async (req, res) => {
    try {
        const email = req.params.email
        const usuarios = await solicitadorService.buscarPorEmail(email);
        return res.send(usuarios).status(httpStatus.SUCCESS)
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const buscarPorCPF = async (req, res) => {
    try {
        const cpf = req.params.cpf
        const usuarios = await solicitadorService.buscarPorCPF(cpf);
        return res.send(usuarios).status(httpStatus.SUCCESS)
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export default { criar, buscar, buscarPorEmail, buscarPorCPF };