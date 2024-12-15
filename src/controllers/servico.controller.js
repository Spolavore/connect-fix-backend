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

export default{ buscar }
