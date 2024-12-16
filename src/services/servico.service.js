import queries from "../queries/servico.queries.js"
import prestadorService from "../services/prestador.service.js";
const buscar = async (idPrestador) => {
    try {
      let prestador = await queries.buscar(idPrestador)
      let nomePrestador = await prestadorService.buscarPorId(idPrestador);
      prestador.nome = nomePrestador;
      return prestador;
      } catch (err) {
        console.error(err);
    }
    return;
}

const criar = async (titulo, descricao, idPrestador, criadoPor) => {
  try {
    return await queries.criar(titulo, descricao, idPrestador, criadoPor)
  } catch (error) {
    console.error(error);
  }
}

export default  { buscar, criar };
