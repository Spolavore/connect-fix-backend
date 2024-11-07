import db from "../../database/connect.js";

const buscar = async () => {
  const query = `select * from servico;`;    
  const dbResponse = await db.query(query);
  return dbResponse.rows;
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

export default { buscar, buscarPorProfissao };
