import httpStatus from "../utils/constants.js";
import agendamentoService from "../services/agendamento.service.js";

const buscarAgendamentosPendentes = async (req,res) => {
    const idPrestador = req.params.id_prestador
    if(!idPrestador) return res.status(httpStatus.BAD_REQUEST).send();
    try {
        const agendamentos = await agendamentoService.buscarAgendamentosPendentes(idPrestador);
        console.log(agendamentos)
        res.status(httpStatus.SUCCESS).send(agendamentos);

    } catch (error) {
        console.error(error)
        return res.status(httpStatus.INTERNAL_ERROR).send();
    }
}


export default {
    buscarAgendamentosPendentes
}