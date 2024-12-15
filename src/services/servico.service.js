import queries from "../queries/servico.queries.js"
const buscar = async (idPrestador) => {
    try {
        return await queries.buscar(idPrestador);
      } catch (err) {
        console.error(err);
    }
    return;
}

export default  { buscar };
