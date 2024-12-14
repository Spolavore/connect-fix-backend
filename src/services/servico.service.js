import queries from "../queries/servico.queries.js"
const buscar = async () => {
    try {
        return await queries.buscar();
      } catch (err) {
        console.error(err);
    }
    return;
}

export default  { buscar };
