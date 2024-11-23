import db from "../../database/connect.js";

const buscarAgendamentosPendentes = async(idPrestador) => {
    const query = `SELECT dt_dia, dt_horario, status, descricao, titulo FROM agendamento a
                   JOIN servico s on (a.id_servico = s.id)
                   WHERE id_prestador = $1 AND status= $2`

    const params = [idPrestador, 'PENDENTE'];
    try {
        const dbResponse = await db.query(query,params);
        return dbResponse.rows;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}


export default {
    buscarAgendamentosPendentes
}