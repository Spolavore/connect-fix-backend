import servicoService from "../services/servico.service.js";
import httpStatus from "../utils/constants.js";

const buscar = async (req, res) => {
    try {
        const servicos = await servicoService.buscar();
        return res.send(servicos).status(httpStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const buscarUm = async (req, res) => {
    try {
        const id = req.params.id;
        const servico = await servicoService.buscarUm(id);
        return res.send(servico).status(httpStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const criar = async (req, res) => {
    const { titulo, descricao, prestador_id} = req.body;

    if (!titulo || !descricao || !prestador_id) return res.status(httpStatus.BAD_REQUEST).send('Falta de Parametros na Request');

    try {
        await servicoService.criar(titulo, descricao, prestador_id);
        return res.sendStatus(httpStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const editar = async (req, res) => {
    const { id } = req.params;

    const { titulo, descricao, prestador_id} = req.body;

    if (!id || !titulo || !descricao || !prestador_id) return res.status(httpStatus.BAD_REQUEST).send('Falta de Parametros na Request');

    try {
        await servicoService.editar(id, titulo, descricao, prestador_id);
        return res.sendStatus(httpStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const buscarPorProfissao = async (req, res) => {
    try {
        const profissao = req.params.profissao;
        const servicos = await servicoService.buscarPorProfissao(profissao);
        return res.send(servicos).status(httpStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export default { buscar, buscarUm, criar, editar, buscarPorProfissao };
