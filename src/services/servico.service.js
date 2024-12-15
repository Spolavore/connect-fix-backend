import queries from "../queries/servico.queries.js"
const buscar = async (idPrestador) => {
    try {
        return await queries.buscar(idPrestador);
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
