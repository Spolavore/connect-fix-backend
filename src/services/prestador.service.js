import queries from "../queries/prestador.queries.js"
import solicitadorService from "../services/solicitador.service.js";
import { createHash } from "crypto";

const criar = async (cpf, nome, email, senha, profissao, cep, cidade,estado) => {
    try {
        const senhaMD5 = createHash('md5').update(senha).digest('hex');
        return await queries.criar(cpf, nome, email, senhaMD5, profissao, cep, cidade, estado);
      } catch (err) {
        throw err;
    }
}

const buscar = async () => {
    try {
        return await queries.buscar();
      } catch (err) {
        console.error(err);
    }
    return;
}

const buscarPorId = async (id) => {
  try {
      return await queries.buscarPorId(id);
    } catch (err) {
      console.error(err);
  }
  return;
}

const buscarPorEmail = async (email) => {
    try {
        return await queries.buscarPorEmail(email);
      } catch (err) {
        console.error(err);
    }
    return;
}
const buscarPorCPF = async (cpf) => {
  try {
      return await queries.buscarPorCPF(cpf);
    } catch (err) {
      console.error(err);
  }
  return;
}
const avaliarSolicitador = async (email, avaliacao) => {
  try {
    var avaliacaoFinal = 0;
      var solicitador = await solicitadorService.buscarPorEmail(email);
      if(solicitador.avaliacao == null){
        avaliacaoFinal = (5 + parseFloat(avaliacao))/2
      }
      else{
        avaliacaoFinal = (solicitador.avaliacao + parseFloat(avaliacao))/2
      }
      return await queries.avaliarSolicitador(email, avaliacaoFinal);
    } catch (err) {
      console.error(err);
  }
  return;
}

export default  { criar, buscar, buscarPorEmail, buscarPorCPF, avaliarSolicitador, buscarPorId };
