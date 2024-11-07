import queries from "../queries/servico.queries.js"

const buscar = async () => {
  try {
    return await queries.buscar();
  } catch (err) {
    console.error(err);
  }
}

const buscarUm = async (id) => {
  try {
    return await queries.buscarUm(id);
  } catch (err) {
    console.error(err);
  }
}

const criar = async (titulo, descricao, prestador_id) => {
  try {
    return await queries.criar(titulo, descricao, prestador_id);
  } catch (err) {
    console.error(err);
  }
}

const editar = async (id, titulo, descricao, prestador_id) => {
  try {
    return await queries.editar(id, titulo, descricao, prestador_id);
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

export default { buscar, buscarUm, criar, editar, buscarPorProfissao };
