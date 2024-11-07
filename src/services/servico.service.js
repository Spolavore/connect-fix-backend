import queries from "../queries/servico.queries.js"

const buscar = async () => {
  try {
    return await queries.buscar();
  } catch (err) {
    console.error(err);
  }
}

const buscarPorProfissao = async (profissao) => {
  try {
    return await queries.buscarPorProfissao(profissao);
  } catch (err) {
    console.error(err);
  }
}

export default { buscar, buscarPorProfissao };
