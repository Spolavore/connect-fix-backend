import db from "../../database/connect.js";

const buscar = async () => {
  const query = `select * from servico;`;    
  const dbResponse = await db.query(query);
  return dbResponse.rows;
}

const buscarUm = async (id) => {
  const query = `select * from servico where id = $1;`;
  const params = [id];
  const dbResponse = await db.query(query, params);
  return dbResponse.rows[0];
}

const criar = async (titulo, descricao, prestador_id) => {
  const query = `insert into servico (titulo, descricao, prestador_id) values ($1, $2, $3);`;
  const params = [titulo, descricao, prestador_id];
  await db.query(query, params);
}

const editar = async (id, titulo, descricao, prestador_id) => {
  const query = `update servico set titulo = $2, descricao = $3, prestador_id = $4 where id = $1;`;
  const params = [id, titulo, descricao, prestador_id];
  await db.query(query, params);
}

const buscarPorProfissao = async (profissao) => {
  const query = `
    SELECT 
      prestador.nome AS prestador_nome,
      prestador.email AS prestador_email,
      prestador.cidade AS prestador_cidade,
      prestador.estado AS prestador_estado,
      prestador.id AS prestador_id,
      servico.descricao AS servico_descricao,
      servico.titulo AS servico_titulo
    FROM servico
    INNER JOIN prestador ON servico.prestador_id = prestador.id
    WHERE prestador.profissao = $1;
  `;
  const params = [profissao];
  const dbResponse = await db.query(query, params);

  return dbResponse.rows.map(row => ({
    prestador: {
      id: row.prestador_id,
      nome: row.prestador_nome,
      email: row.prestador_email,
      cidade: row.prestador_cidade,
      estado: row.prestador_estado
    },
    descricao: row.servico_descricao,
    titulo: row.servico_titulo
  }));
}

export default { buscar, buscarUm, criar, editar, buscarPorProfissao };
