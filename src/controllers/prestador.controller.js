import prestadorService from "../services/prestador.service.js";
import httpStatus from "../utils/constants.js";

const criar = async (req,res) => {
    const cpf = req.body.cpf;
    const email = req.body.email;
    const nome = req.body.nome; 
    const senha = req.body.senha;
    const profissao= req.body.profissao;
    const cep = req.body.cep;
    const cidade = req.body.cidade
    const estado = req.body.estado

    if(!cpf || !email || !nome || !senha || !profissao || !cep || !cidade || !estado ) return res.status(httpStatus.BAD_REQUEST).send('Falta de Parametros na Request');

    try {
        await prestadorService.criar(cpf, nome, email, senha, profissao, cep, cidade, estado);
        return res.sendStatus(httpStatus.SUCCESS);
        
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    
};

const buscar = async (req, res) => {
    try {
        const prestador = await prestadorService.buscar();
        return res.send(prestador).status(httpStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const buscarPorEmail = async (req, res) => {
    try {
        const email = req.params.email
        const provedores = await prestadorService.buscarPorEmail(email);
        return res.send(provedores).status(httpStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}
const buscarPorCPF = async (req, res) => {
    try {
        const cpf = req.params.cpf
        const usuarios = await pService.buscarPorCPF(cpf);
        return res.send(usuarios).status(httpStatus.SUCCESS)
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const buscarDatasOcupadas = async (req, res) => {
    try {
        const id = req.params.id
        const datas = await prestadorService.buscarDatasOcupadas(id);
        return res.send(datas).status(httpStatus.SUCCESS)
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export default { criar, buscar, buscarPorEmail, buscarPorCPF, buscarDatasOcupadas };
