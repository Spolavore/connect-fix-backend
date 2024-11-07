import queries from "../queries/agendamento.queries.js"

const criar = async (servico_id, data, periodo, solicitador_id) => {
    try {
        return await queries.criar(servico_id, data, periodo, solicitador_id);
    } catch (err) {
        console.error(err);
    }
}

export default { criar };
