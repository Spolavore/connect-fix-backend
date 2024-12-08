import queriesAgendamento from '../queries/agendamento.queries.js'

const buscarAgendamentos = async (idPrestador, status) => {
    try {
        const agendamentosPendentes = await queriesAgendamento.buscarAgendamentos(idPrestador, status);
        return agendamentosPendentes;
    } catch (error) {
        console.error(error);
        throw new Error (error.message);
    }
}



const atualizarStatus = async (status, agendamento) => {
    const statusAgendamentoPossiveis = ['PENDENTE', 'EM ANDAMENTO', 'EM CONFIRMACAO', 'CONCLUIDO', 'RECUSADO'];
    if(!statusAgendamentoPossiveis.some( s => s == status)){
         throw new Error ('Status fornecido não reconhecido')
    }
    try {
        await queriesAgendamento.atualizarStatus(status, agendamento);
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao atualizar status");
    }
}


export default {
    buscarAgendamentos,
    atualizarStatus
}