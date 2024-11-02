import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

dotenv.config()
// Configurações de conexão com o PostgreSQL
const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Certifique-se de definir isso se o Railway exigir SSL
  }
});

// Conectar ao banco de dados
db.connect()
  .then(() => console.log('Conectado ao PostgreSQL!'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL', err));

export default db;