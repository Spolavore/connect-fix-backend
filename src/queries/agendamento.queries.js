import db from "../../database/connect.js";

const buscarAgendamentos = async(idUsuario,status, tipoUsuario) => {
    let query = `SELECT id_agendamento,dt_dia, dt_horario, status, descricao, titulo, dt_criacao, sl.nome as nome_solicitador,
                pt.nome as nome_prestador, sl.email as email_solicitador, pt.email as email_prestador, confirmacao_prestador,
                confirmacao_solicitador FROM agendamento a
                JOIN servico s on (a.id_servico = s.id) 
                JOIN solicitador sl on (a.id_solicitador = sl.id)
                JOIN prestador pt on (a.id_prestador = pt.id) WHERE `

    query += tipoUsuario == 'PRESTADOR' ? 'a.id_prestador = $1' : 'a.id_solicitador = $1';
    let params = [idUsuario];
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

const atualizarStatus = async(status, agendamento, tipoUsuario) => {
    console.log(agendamento)
    let query = `UPDATE agendamento set status = $1`

    if(status == 'EM CONFIRMACAO' || status == 'CONCLUIDO'){
        query += tipoUsuario == 'PRESTADOR' ? ', confirmacao_prestador = true' :  ', confirmacao_prestador = true';
    }
    
    query += ' where id_agendamento = $2'
    
        
    const params = [status, agendamento]

    try {
        const dbResponse = await db.query(query, params);
        return dbResponse;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }

}
const realizarAgendamento = async(idServico, idPrestador, idSolicitador, dia, horario, status) => {
    try {
        const query = `INSERT INTO agendamento (id_servico, id_prestador, id_solicitador, dt_dia, dt_horario, dt_criacao, status)
                       values ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6);
        `
        const params = [idServico, idPrestador, idSolicitador, dia, horario, status]
        await db.query(query, params);
    } catch (error) {
        console.error(error);
        throw new Error(error.message);

    }
};
export default {
    buscarAgendamentos,
    atualizarStatus,
    realizarAgendamento
}