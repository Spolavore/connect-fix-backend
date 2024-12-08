import db from "../../database/connect.js";

const buscarAgendamentos = async(idPrestador,status) => {
    let query = `SELECT id_agendamento,dt_dia, dt_horario, status, descricao, titulo, dt_criacao, sl.nome as nome_solicitador,
                pt.nome as nome_prestador FROM agendamento a
                JOIN servico_solicitado s on (a.id_servico = s.id) 
                JOIN solicitador sl on (a.id_solicitador = sl.id)
                JOIN prestador pt on (a.id_prestador = pt.id)  WHERE id_prestador = $1`

    let params = [idPrestador];
    if(status) {
        query += ' AND status= $2 ORDER BY dt_criacao DESC'
        params.push(status)
    }      
    else {
        query += ' ORDER BY dt_criacao DESC'
    }
    try {
        const dbResponse = await db.query(query,params);
        return dbResponse.rows;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

const atualizarStatus = async(status, agendamento) => {
    const query = `UPDATE agendamento set status = $1 where id_agendamento = $2`
    const params = [status, agendamento]

    try {
        const dbResponse = await db.query(query, params);
        return dbResponse;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }

}

export default {
    buscarAgendamentos,
    atualizarStatus
}