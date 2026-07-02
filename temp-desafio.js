import prisma from './prisma/client.js';

   const alunoInexistente = await prisma.aluno.findUnique({
  where: { id: 999 },
});
console.log('Aluno 999:', alunoInexistente);

const novaMensagem = await prisma.mensagem.create({
  data: {
    texto: 'Boa sorte na faculdade, Maria!',
    autorId: 1, 
  },
});
console.log('Mensagem criada:', novaMensagem);

const mensagensComAutor = await prisma.mensagem.findMany({
  include: {
    autor: {
      select: { nome: true, fotoUrl: true },
    },
  },
});
console.log('Mensagens com autor:', mensagensComAutor);

   await prisma.$disconnect();