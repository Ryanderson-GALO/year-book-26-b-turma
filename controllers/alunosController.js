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
export async function listarAlunos(req, res, next) {
     try {
       const alunos = await prisma.aluno.findMany({
         select: selectSemSenha,
       });
       res.json(alunos);
     } catch (erro) {
       next(erro);
     }
   }

// GET /alunos/:id — busca um aluno pelo ID
export async function buscarAluno(req, res, next) {
  try {
    const { id } = req.params;
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(id) },
      select: selectSemSenha,
    });
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (erro) {
    next(erro);
  }
}

// POST /alunos — cria um novo aluno
export async function criarAluno(req, res, next) {
  try {
    const { nome, email, senhaHash, cidade, frase, planosFuturos } = req.body;

    const alunoCriado = await prisma.aluno.create({
      data: { nome, email, senhaHash, cidade, frase, planosFuturos },
      select: selectSemSenha,
    });

    res.status(201).json(alunoCriado);
  } catch (erro) {
    next(erro);
  }
}

// PUT /alunos/:id — atualiza um aluno existente
export async function atualizarAluno(req, res, next) {
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
export async function deletarAluno(req, res, next) {
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