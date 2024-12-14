import db from "../../database/connect.js";

const buscar = async () => {
    const query = `select * from servico;`;    
    const dbResponse = await db.query(query);
    return dbResponse.rows;
}

export default { buscar }
