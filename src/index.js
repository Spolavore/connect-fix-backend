import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import dotenv from 'dotenv'

// Controllers
import prestador from './controllers/prestador.controller.js'
import solicitador from "./controllers/solicitador.controller.js"
import servico from './controllers/servico.controller.js'
import auth from './controllers/auth.controller.js'

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
app.get('/prestador/datas-ocupadas/:id', prestador.buscarDatasOcupadas)

// Solicitador
app.post('/solicitador', solicitador.criar)
app.get('/solicitador', solicitador.buscar)
app.get('/prestador/:email', prestador.buscarPorEmail)
app.get('/solicitador/:cpf', solicitador.buscarPorCPF)

// Servico
app.get('/servico', servico.buscar)
app.get('/servico/:profissao', servico.buscarPorProfissao)

// Login
app.post('/login', auth.login)

app.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}`)
});
