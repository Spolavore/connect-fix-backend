import queriesAgendamento from '../queries/agendamento.queries.js'

const buscarAgendamentos = async (idPrestador, status, tipoUsuario) => {
    try {
        const agendamentosPendentes = await queriesAgendamento.buscarAgendamentos(idPrestador, status, tipoUsuario);
        return agendamentosPendentes;
    } catch (error) {
        console.error(error);
        throw new Error (error.message);
    }
}



const atualizarStatus = async (status, agendamento, tipoUsuario) => {
    const statusAgendamentoPossiveis = ['PENDENTE', 'EM ANDAMENTO', 'EM CONFIRMACAO', 'CONCLUIDO', 'RECUSADO', 'CANCELADO'];
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