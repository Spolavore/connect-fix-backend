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

export default { buscar, buscarPorProfissao };
