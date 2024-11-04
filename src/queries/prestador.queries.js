import db from "../../database/connect.js";

const criar = async (cpf, nome, email, senha, profissao, cep, cidade, estado) => {
    const query = `INSERT INTO prestador (cpf, nome, email, senha, profissao, cep, cidade, estado)
                  values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;    
    const params = [cpf, nome, email, senha, profissao, cep, cidade, estado];
    const dbResponse = await db.query(query,params);
    return dbResponse.rows[0];
}

const buscar = async () => {
    const query = `select * from prestador;`;    
    const dbResponse = await db.query(query);
    return dbResponse.rows;
}

const buscarPorEmail = async (email) => {
    const query = `select * from prestador where email = $1;`; 
    const params = [email];   
    const dbResponse = await db.query(query,params);
    return dbResponse.rows[0];
}

export default {
    criar, buscar, buscarPorEmail
}
