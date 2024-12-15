import db from "../../database/connect.js";

const buscar = async (idPrestador) => {
    let query = `select * from servico`;    
    idPrestador != null ? query += ` where id_prestador = ${idPrestador}` : '';
    const dbResponse = await db.query(query);
    return dbResponse.rows;
}

export default { buscar }
