import servicoService from "../services/servico.service.js";
import httpStatus from "../utils/constants.js";

const buscar = async (req, res) => {
    try {
        const idPrestador = req.params.id_prestador;
        const servico = await servicoService.buscar(idPrestador);
        return res.send(servico).status(httpStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const criar = async (req, res) => {
    try {
        const titulo = req.body.titulo;
        const descricao = req.body.descricao;
        const idPrestador = req.body.idPrestador;
        const criadoPor = req.body.criado_por;
        if(!titulo || !descricao || !idPrestador || !criadoPor) res.status(httpStatus.BAD_REQUEST).send('Falta de parametros');

        await servicoService.criar(titulo, descricao, idPrestador, criadoPor);
        return res.status(httpStatus.SUCCESS).send();

    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export default{ buscar, criar }
