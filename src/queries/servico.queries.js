import db from "../../database/connect.js";

const buscar = async (idPrestador) => {
    let query = `select * from servico s join prestador p on (s.id_prestador = p.id)`;    
    idPrestador != null ? query += ` where id_prestador = ${idPrestador}` : '';
    const dbResponse = await db.query(query);
    return dbResponse.rows;
}

const criar = async (titulo, descricao, idPrestador) => {

    try {
        const query = `INSERT INTO servico (id_prestador, titulo, descricao) 
                     values ($1, $2, $3)
        `
        const params = [idPrestador, titulo, descricao];
        return await db.query(query,params);
    } catch (error) {
        console.error(error);
    }
}

export default { buscar, criar }
