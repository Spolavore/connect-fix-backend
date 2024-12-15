import db from "../../database/connect.js";

const buscar = async (idPrestador) => {
    let query = `select s.id as id_servico, s.id_prestador, titulo, descricao, nome, email, profissao, avaliacao 
                from servico s join prestador p on (s.id_prestador = p.id)
                `;    
    idPrestador != null ? query += ` where id_prestador = ${idPrestador}` : '';
    const dbResponse = await db.query(query);
    return dbResponse.rows;
}

const criar = async (titulo, descricao, idPrestador, criadoPor) => {

    try {
        const query = `INSERT INTO servico (id_prestador, titulo, descricao, criado_por) 
                     values ($1, $2, $3, $4)
                    `
        const params = [idPrestador, titulo, descricao, criadoPor];
        return await db.query(query,params);
    } catch (error) {
        console.error(error);
    }
}

export default { buscar, criar }
