import servicoService from "../services/servico.service.js";
import httpStatus from "../utils/constants.js";

const buscar = async (req, res) => {
    try {
        const servico = await servicoService.buscar();
        return res.send(servico).status(httpStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export default{ buscar }
