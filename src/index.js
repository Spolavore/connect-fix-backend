import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import dotenv from 'dotenv'

// Controllers
import prestador from './controllers/prestador.controller.js'
import solicitador from "./controllers/solicitador.controller.js"


dotenv.config()
const app = express();
const porta = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Provedor
app.post('/prestador', prestador.criar)
app.get('/prestador', prestador.buscar)
app.get('/prestador/:email', prestador.buscarPorEmail)

// Solicitador
app.post('/solicitador', solicitador.criar)
app.get('/solicitador', solicitador.buscar)
app.get('/solicitador/:email', solicitador.buscarPorEmail)

app.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}`)
});
