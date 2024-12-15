import db from "../../database/connect.js";

const criar = async (cpf, nome, email, senha) => {
    const query = `INSERT INTO solicitador (cpf, nome, email, senha)
                  values ($1, $2, $3, $4) RETURNING *`;    
    const params = [cpf, nome, email, senha];
    try {
        const dbResponse = await db.query(query,params);
        return dbResponse.rows[0];
    } catch (error) {
        throw new Error("Erro na Inserção")
    }
 
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
const buscarPorCPF = async (cpf) =>{
    const query = `select * from prestador where cpf = $1;`
    const params = [cpf]
    const dbResponse = await db.query(query,params)
    return dbResponse.rows[0]
}

const avaliarPrestador = async (email, avaliacao) => {
    console.log('teste')
    const query = `UPDATE prestador SET avaliacao=$2 WHERE email=$1`;    
    const params = [email, avaliacao];
    try {
        const dbResponse = await db.query(query,params);
        return dbResponse.rows[0];
    } catch (error) {
        throw new Error("Erro na Inserção da Avaliação")
    }
}

export default {
    criar, buscar, buscarPorEmail, buscarPorCPF, avaliarPrestador
}
