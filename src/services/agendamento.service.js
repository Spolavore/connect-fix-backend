import queriesAgendamento from '../queries/agendamento.queries.js'

const buscarAgendamentosPendentes = async (idPrestador) => {
    try {
        const agendamentosPendentes = await queriesAgendamento.buscarAgendamentosPendentes(idPrestador);
        return agendamentosPendentes;
    } catch (error) {
        console.error(error);
        throw new Error (error.message);
    }
}

export default {
    buscarAgendamentosPendentes
}