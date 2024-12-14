import httpStatus from "../utils/constants.js";

import agendamentoService from "../services/agendamento.service.js";

const buscarAgendamentos = async (req,res) => {
    const idUsuario = req.params.id_usuario
    const status = req.params.status
    const tipoUsuario = req.params.tipo_usuario.toUpperCase();

    if(tipoUsuario != 'PRESTADOR' && tipoUsuario != 'SOLICITADOR')  return res.status(httpStatus.BAD_REQUEST).send();
    if(!idUsuario) return res.status(httpStatus.BAD_REQUEST).send();

    try {
        const agendamentos = await agendamentoService.buscarAgendamentos(idUsuario,status,tipoUsuario);
        res.status(httpStatus.SUCCESS).send(agendamentos);

    } catch (error) {
        console.error(error)
        return res.status(httpStatus.INTERNAL_ERROR).send();
    }
}

const atualizarStatus = async (req, res) => {
    const status = req.body.status;
    const idAgendamento = req.body.idAgendamento;
    const tipoUsuario = req.body.tipoUsuario.toUpperCase();

    if(tipoUsuario != 'PRESTADOR' && tipoUsuario != 'SOLICITADOR')  return res.status(httpStatus.BAD_REQUEST).send();
    try {
        await agendamentoService.atualizarStatus(status , idAgendamento, tipoUsuario);
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