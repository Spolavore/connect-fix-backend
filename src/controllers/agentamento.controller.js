import httpStatus from "../utils/constants.js";
import agendamentoService from "../services/agendamento.service.js";


const buscarAgendamentos = async (req,res) => {
    const idUsuario = req.params.id_usuario
    const status = req.params.status
    const tipoUsuario = req.params.tipo_usuario.toUpperCase();

    if(tipoUsuario != 'PRESTADOR' && tipoUsuario != 'SOLICITADOR')  return res.status(httpStatus.BAD_REQUEST).send();
    if(!idUsuario) return res.status(httpStatus.BAD_REQUEST).send();

    try {
        const agendamentos = await agendamentoService.buscarAgendamentos(idUsuario,status,tipoUsuario);
        res.status(httpStatus.SUCCESS).send(agendamentos);

    } catch (error) {
        console.error(error)
        return res.status(httpStatus.INTERNAL_ERROR).send();
    }
}

const atualizarStatus = async (req, res) => {
    const status = req.body.status;
    const idAgendamento = req.body.idAgendamento;
    const tipoUsuario = req.body.tipoUsuario.toUpperCase();

    if(tipoUsuario != 'PRESTADOR' && tipoUsuario != 'SOLICITADOR' || !idAgendamento)  return res.status(httpStatus.BAD_REQUEST).send();

    try {
        await agendamentoService.atualizarStatus(status , idAgendamento, tipoUsuario);
        res.status(httpStatus.SUCCESS).send();
    } catch (error) {
        console.error(error)
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

const baixarCertificado = async (req, res) => {
    const userInfo = req.body.userInfo;

    try {
        // Gera o PDF
        const filePath = await agendamentoService.gerarPDF(userInfo);

        // Serve o PDF para o front-end
        console.log('Servindo o arquivo para o front-end...');
        res.download(filePath, 'certificado_conclusao.pdf', (err) => {
            if (err) {
                console.error('Erro ao enviar o PDF:', err);
                return res.status(httpStatus.INTERNAL_ERROR).send('Erro ao baixar o certificado.');
            }
        });
    } catch (error) {
        console.error('Erro ao gerar ou enviar o certificado:', error);
        res.status(httpStatus.INTERNAL_ERROR).send('Erro ao gerar o certificado.');
    }
};

const realizarAgendamento = async(req, res) => {

    const idServico = req.body.id_servico;
    const idPrestador = req.body.id_prestador;
    const idSolicitador = req.body.id_solicitador;
    const dia = req.body.dia;
    const horario = req.body.horario;
    const status = 'PENDENTE'

    if(!idServico || !idPrestador || !idSolicitador || !dia || !horario) return res.status(httpStatus.BAD_REQUEST).send('Falta de parametros');
    try {
        await agendamentoService.realizarAgendamento(idServico, idPrestador, idSolicitador, dia, horario, status);
        return res.status(httpStatus.SUCCESS).send();
    } catch (error) {
        console.error(error);
        return res.status(httpStatus.INTERNAL_ERROR).send('Erro ao realizar agendamento.');
        
    }
}

export default {
    buscarAgendamentos,
    atualizarStatus,
    baixarCertificado,
    realizarAgendamento
}