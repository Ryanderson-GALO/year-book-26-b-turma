import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// select que omite senhaHash — reutilizado em todas as queries de alunos
const selectSemSenha = {
  id: true,
  nome: true,
  email: true,
  cidade: true,
  frase: true,
  planosFuturos: true,
  fotoUrl: true,
  role: true,
  criadoEm: true,
  // senhaHash NÃO está aqui — nunca retornado
};

// GET /alunos — lista todos os alunos
export async function listarAlunos(req, res) {
  const alunos = await prisma.aluno.findMany({
    select: selectSemSenha, // retorna todos os campos EXCETO senhaHash
  });
  res.json(alunos); // responde com o array de alunos em JSON
}

// GET /alunos/:id — busca um aluno pelo ID
export async function buscarAluno(req, res) {
  const { id } = req.params; // extrai o :id da URL
  const aluno = await prisma.aluno.findUnique({
    where: { id: Number(id) }, // converte string → number
    select: selectSemSenha,    // omite senhaHash
  });

  if (!aluno) {
    return res.status(404).json({ erro: 'Aluno não encontrado' }); // null → 404
  }

  res.json(aluno); // retorna o aluno encontrado
}

// POST /alunos — cria um novo aluno
export async function criarAluno(req, res) {
  // 1. Extrai os campos de req.body
  const { nome, email, senhaHash, cidade, frase, planosFuturos } = req.body;

  // 2. Cria o aluno no banco via Prisma, já omitindo senhaHash na resposta
  const alunoCriado = await prisma.aluno.create({
    data: { nome, email, senhaHash, cidade, frase, planosFuturos },
    select: selectSemSenha,
  });

  // 3. Retorna 201 (Created) com o aluno criado
  res.status(201).json(alunoCriado);
}

// PUT /alunos/:id — atualiza um aluno existente
export async function atualizarAluno(req, res) {
  const { id } = req.params;      // 1. id vem da URL
  const dados = req.body;         // 2. dados atualizados vêm do body

  try {
    // 3a. Tenta atualizar — se o id não existir, o Prisma lança erro
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: Number(id) },
      data: dados,
      select: selectSemSenha,
    });
    res.json(alunoAtualizado);
  } catch (erro) {
    // 3b. Se o Prisma lançar erro, é porque o aluno não existe
    res.status(404).json({ erro: 'Aluno não encontrado' });
  }
}

// DELETE /alunos/:id — deleta um aluno
export async function deletarAluno(req, res) {
  const { id } = req.params; // 1. id vem da URL

  try {
    // 2a. Tenta deletar — se o id não existir, o Prisma lança erro
    await prisma.aluno.delete({
      where: { id: Number(id) },
    });
    res.status(204).end(); // 204 = sucesso, sem conteúdo no corpo
  } catch (erro) {
    // 2b. Se o Prisma lançar erro, é porque o aluno não existe
    res.status(404).json({ erro: 'Aluno não encontrado' });
  }
}