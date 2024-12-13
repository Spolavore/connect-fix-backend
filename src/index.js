import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import dotenv from 'dotenv'

// Controllers
import prestador from './controllers/prestador.controller.js'
import solicitador from "./controllers/solicitador.controller.js"
import auth from './controllers/auth.controller.js'
import servico from "./controllers/servico.controller.js"

dotenv.config()
const app = express();
const porta = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Prestador
app.post('/prestador', prestador.criar)
app.get('/prestador', prestador.buscar)
app.get('/prestador/:email', prestador.buscarPorEmail)
app.get('/prestador/cpf/:cpf', prestador.buscarPorCPF)
app.post('/prestador/avaliar/:email/:avaliacao', prestador.avaliarSolicitador)

// Solicitador
app.post('/solicitador', solicitador.criar)
app.get('/solicitador', solicitador.buscar)
app.get('/solicitador/:email', solicitador.buscarPorEmail)
app.get('/solicitador/cpf/:cpf', solicitador.buscarPorCPF)
app.post('/solicitador/avaliar/:email/:avaliacao', solicitador.avaliarPrestador)

// Serviços
app.get('/servico', servico.buscar)

// Login
app.post('/login', auth.login)

app.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}`)
});
