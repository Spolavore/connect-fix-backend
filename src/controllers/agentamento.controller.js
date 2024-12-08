import httpStatus from "../utils/constants.js";

import agendamentoService from "../services/agendamento.service.js";

const buscarAgendamentos = async (req,res) => {
    const idPrestador = req.params.id_prestador
    const status = req.params.status

    if(!idPrestador) return res.status(httpStatus.BAD_REQUEST).send();
    try {
        const agendamentos = await agendamentoService.buscarAgendamentos(idPrestador,status);
        res.status(httpStatus.SUCCESS).send(agendamentos);

    } catch (error) {
        console.error(error)
        return res.status(httpStatus.INTERNAL_ERROR).send();
    }
}

const atualizarStatus = async (req, res) => {
    const status = req.body.status;
    const idAgendamento = req.body.idAgendamento;
    try {
        await agendamentoService.atualizarStatus(status , idAgendamento);
        res.status(httpStatus.SUCCESS).send();
    } catch (error) {
        console.error(error)
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export default {
    buscarAgendamentos,
    atualizarStatus
}