import db from "../../database/connect.js";

const buscar = async (idPrestador) => {
    let query = `select s.id as id_servico, s.id_prestador, titulo, descricao, nome, email, profissao, avaliacao 
                from servico s join prestador p on (s.id_prestador = p.id)
                `;    
    idPrestador != null ? query += ` where id_prestador = ${idPrestador} and criado_por = 'PRESTADOR'` : '';
    const dbResponse = await db.query(query);
    return dbResponse.rows;
}

const criar = async (titulo, descricao, idPrestador, criadoPor) => {

    try {
        const query = `INSERT INTO servico (id_prestador, titulo, descricao, criado_por) 
                     values ($1, $2, $3, $4)
                     RETURNING *
                    `
        const params = [idPrestador, titulo, descricao, criadoPor];
        const dbResponse = await db.query(query,params);
        return dbResponse.rows[0];
    } catch (error) {
        console.error(error);
    }
}

export default { buscar, criar }
