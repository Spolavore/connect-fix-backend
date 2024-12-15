import db from "../../database/connect.js";

const buscarAgendamentos = async(idUsuario,status, tipoUsuario) => {
    let query = `SELECT id_agendamento,dt_dia, dt_horario, status, descricao, titulo, dt_criacao, sl.nome as nome_solicitador,
                pt.nome as nome_prestador, sl.email as email_solicitador, pt.email as email_prestador, confirmacao_prestador,
                confirmacao_solicitador FROM agendamento a
                JOIN servico s on (a.id_servico = s.id) 
                JOIN solicitador sl on (a.id_solicitador = sl.id)
                JOIN prestador pt on (a.id_prestador = pt.id) WHERE `

    query += tipoUsuario == 'PRESTADOR' ? 'id_prestador = $1' : 'id_solicitador = $1';
    let params = [idUsuario];
    if(status) {
        query += ' AND status= $2 ORDER BY dt_criacao DESC'
        params.push(status)
    }      
    else {
        query += ' ORDER BY dt_criacao DESC'
    }
    console.log(query, tipoUsuario)

    try {
        const dbResponse = await db.query(query,params);
        return dbResponse.rows;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

const atualizarStatus = async(status, agendamento, tipoUsuario) => {
    let query = `UPDATE agendamento set status = $1`

    if(status == 'EM CONFIRMACAO' || status == 'CONCLUIDO'){
        query += tipoUsuario == 'PRESTADOR' ? ', confirmacao_prestador = true' : ', confirmacao_prestador = true';
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

export default {
    buscarAgendamentos,
    atualizarStatus
}