import db from "../../database/connect.js";

const criar = async (cpf, nome, email, senha) => {
    const query = `INSERT INTO solicitador (cpf, nome, email, senha)
                  values ($1, $2, $3, $4) RETURNING *`;    
    const params = [cpf, nome, email, senha];
    const dbResponse = await db.query(query,params);
    return dbResponse.rows[0];
}

const buscar = async () => {
    const query = `select * from solicitador;`;    
    const dbResponse = await db.query(query);
    return dbResponse.rows;
}

const buscarPorEmail = async (email) => {
    const query = `select * from solicitador where email = $1;`; 
    const params = [email];   
    const dbResponse = await db.query(query,params);
    return dbResponse.rows[0];
}

export default {
    criar, buscar, buscarPorEmail
}
