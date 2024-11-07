import db from "../../database/connect.js";

const criar = async (servico_id, data, periodo, solicitador_id) => {
    const query = `INSERT INTO agendamento (servico_id, data, periodo, solicitador_id)
                  values ($1, $2, $3, $4) RETURNING *`;    
    const params = [servico_id, data, periodo, solicitador_id];
    try {
        const dbResponse = await db.query(query,params);
        return dbResponse.rows[0];
    } catch (error) {
        throw new Error("Erro na Inserção")
    }
}

export default { criar };
