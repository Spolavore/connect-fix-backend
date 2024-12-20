import { error } from "console";
import queries from "../queries/solicitador.queries.js"
import prestadorService from "../services/prestador.service.js";
import { createHash } from "crypto";

const criar = async (cpf, nome, email, senha) => {
    try {
        const senhaMD5 = createHash('md5').update(senha).digest('hex');
        return await queries.criar(cpf, nome, email, senhaMD5); // Exemplo de consultaDS
      } catch (err) {
        throw err;
    }
    return;
}

const buscar = async () => {
    try {
        return await queries.buscar();
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

const avaliarPrestador = async (email, avaliacao) => {
  try {
    var avaliacaoFinal = 0;
      var prestador = await prestadorService.buscarPorEmail(email);
      if(prestador.avaliacao == null){
        avaliacaoFinal = (5 + parseFloat(avaliacao))/2
      }
      else{
        avaliacaoFinal = (prestador.avaliacao + parseFloat(avaliacao))/2
      }
      return await queries.avaliarPrestador(email, avaliacaoFinal);
    } catch (err) {
      console.error(err);
  }
  return;
}

export default  { criar, buscar, buscarPorEmail, buscarPorCPF, avaliarPrestador };
