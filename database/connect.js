import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

dotenv.config()
// Configurações de conexão com o PostgreSQL
const db = new Client({
  user: process.env.DB_USER,     
  host: process.env.DB_HOST,       
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,  
  port: 5432,              
});

// Conectar ao banco de dados
db.connect()
  .then(() => console.log('Conectado ao PostgreSQL!'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL', err));

export default db;