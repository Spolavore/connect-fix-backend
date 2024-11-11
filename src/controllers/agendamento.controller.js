import agendamentoService from "../services/agendamento.service.js";
import httpStatus from "../utils/constants.js";

const criar = async (req, res) => {
    const { servico_id, data, periodo, solicitador_id } = req.body;

    if (!servico_id || !data || !periodo || !solicitador_id) return res.status(httpStatus.BAD_REQUEST).send('Falta de Parametros na Request');

    try {
        await agendamentoService.criar(servico_id, data, periodo, solicitador_id);
        return res.sendStatus(httpStatus.SUCCESS);
    } catch (error) {
        console.error(error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export default { criar };
