import db from "../../database/connect.js";


const criarUsuario = async (cpf, nome, email, senha) => {
    const query = `INSERT INTO users (cpf, nome, email, senha)
                  values ($1, $2, $3, $4) RETURNING *`;    
    const params = [cpf, nome, email, senha];
    const dbResponse = await db.query(query,params);
    return dbResponse.rows[0];
}

const buscarUsuarios = async () => {
    const query = `select * from users;`;    
    const dbResponse = await db.query(query);
    return dbResponse.rows;
}

const buscarUsuarioPorEmail = async (email) => {
    const query = `select * from users where email = $1;`; 
    const params = [email];   
    const dbResponse = await db.query(query,params);
    return dbResponse.rows[0];
}

export default {
    criarUsuario, buscarUsuarios, buscarUsuarioPorEmail
}