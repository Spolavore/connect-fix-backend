import queriesAgendamento from '../queries/agendamento.queries.js'
import PDFDocument from 'pdfkit';
import fs from 'fs';

const buscarAgendamentos = async (idPrestador, status, tipoUsuario) => {
    try {
        const agendamentosPendentes = await queriesAgendamento.buscarAgendamentos(idPrestador, status, tipoUsuario);
        return agendamentosPendentes;
    } catch (error) {
        console.error(error);
        throw new Error (error.message);
    }
}

const buscarAgendamento = async (idAgendamento) => {
    try {
        const agendamento = await queriesAgendamento.buscarAgendamento(idAgendamento);
        return agendamento;
    } catch (error) {
        console.error(error);
        throw new Error (error.message);
    }
}



const atualizarStatus = async (status, agendamento, tipoUsuario) => {
    const statusAgendamentoPossiveis = ['PENDENTE', 'EM ANDAMENTO', 'EM CONFIRMACAO', 'CONCLUIDO', 'RECUSADO', 'CANCELADO'];
    if(!statusAgendamentoPossiveis.some( s => s == status)){
         throw new Error ('Status fornecido não reconhecido')
    }
    try {
        const agendamentoSolicitado = await buscarAgendamento(agendamento);
        if(agendamentoSolicitado.status == 'EM CONFIRMACAO'){
            status = 'CONCLUIDO'
        }
        await queriesAgendamento.atualizarStatus(status, agendamento, tipoUsuario);
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao atualizar status");
    }
}

const gerarPDF = (userInfo) => {

    return new Promise((resolve, reject) => {
        try {
            console.log('Iniciando criação do PDF...');
            const outputPath = 'certificado_conclusao.pdf'; // Caminho absoluto
            const doc = new PDFDocument();
            const stream = fs.createWriteStream(outputPath);

            // Direciona o PDF para o arquivo
            doc.pipe(stream);

            // Cabeçalho do PDF
            doc.fontSize(20).text('Certificado de Conclusão', { align: 'center' }).moveDown();

            if(userInfo.tipoUsuario == 'PRESTADOR'){
                doc.fontSize(14).text(
                    `A Connect & Fix certifica que o usuário ${userInfo.nomePrestador} do tipo "${userInfo.tipoUsuario}". Realizou o seguinte serviço:
                    `,
                    { align: 'justify' }
                );
            }
            else {
                doc.fontSize(14).text(
                    `A Connect & Fix certifica que o usuário ${userInfo.nomeSolicitador} do tipo "${userInfo.tipoUsuario}". Recebeu o seguinte serviço:
                    `,
                    { align: 'justify' }
                );
            }
            doc.fontSize(14).text(
                ` 
              Informações
                
              Data conclusão: ${userInfo.data} 
              Titulo serviço: ${userInfo.servico}    
              Nome prestador: ${userInfo.nomePrestador}
              Nome solicitador: ${userInfo.nomeSolicitador}
            

                `,
                { align: 'center' }
            );

            // Rodapé
            doc.moveDown(2).fontSize(12).text('Assinado eletronicamente', { align: 'center' });

            // Finaliza o documento
            doc.end();

            // Resolve a promise quando o PDF estiver pronto
            stream.on('finish', () => {
                console.log('PDF salvo com sucesso.');
                resolve(outputPath); // Retorna o caminho do arquivo gerado
            });

            stream.on('error', (error) => {
                console.error('Erro ao salvar o PDF:', error);
                reject(error);
            });
        } catch (error) {
            console.error('Erro na criação do PDF:', error);
            reject(error);
        }
    });
};

const realizarAgendamento = async(idServico, idPrestador, idSolicitador, dia, horario, status) => {
    try {
        await queriesAgendamento.realizarAgendamento(idServico, idPrestador, idSolicitador, dia, horario, status);
    } catch (error) {
        console.error(error);
        throw new Error(error.message);

    }
}

export default {
    buscarAgendamentos,
    buscarAgendamento,
    atualizarStatus,
    gerarPDF,
    realizarAgendamento
}