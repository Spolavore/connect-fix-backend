import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import dotenv from 'dotenv'
// Controllers
import testeController from './controllers/testeController.js'

dotenv.config()
const app = express();
const porta = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Rotas
app.get('/leonardo', testeController.exemploGet)

app.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}`)
});