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
import agendamento from './controllers/agentamento.controller.js'


dotenv.config()
const app = express();
const porta = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Prestador
app.post('/prestador', prestador.criar)
app.get('/prestador', prestador.buscar)
app.get('/prestador/:id', prestador.buscarPorId)
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
app.get('/servico/:id_prestador?', servico.buscar)
app.post('/servico', servico.criar)


// Login
app.post('/login', auth.login)


// Agendamento
app.get('/agendamentos/:id_usuario/:tipo_usuario/:status?', agendamento.buscarAgendamentos )
app.post('/atualizarStatusAgendamento', agendamento.atualizarStatus)
app.post('/realizarAgendamento', agendamento.realizarAgendamento)
app.post('/baixarCertificado', agendamento.baixarCertificado)
app.post('/requerirAgendamento', agendamento.requerirAgendamento)

app.listen(porta, () => {
    console.log(`Aplicação rodando na porta ${porta}`)
});
