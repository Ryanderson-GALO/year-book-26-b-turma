import prisma from './prisma/client.js';

   const alunosAntes = await prisma.aluno.findMany()
   console.log('Alunos antes:', alunosAntes)

   const novoAluno = await prisma.aluno.create({
     data: {
       nome: 'Maria Silva',
       email: 'maria@email.com',
       senhaHash: 'hash_temporario_123',
       cidade: 'Salinas',
       frase: 'Bora que bora!',
       planosFuturos: 'Cursar Ciência da Computação',
     },
   });
   console.log('Novo aluno criado:', novoAluno)


   const alunosDepois = await prisma.aluno.findMany()
   console.log('Alunos depois:', alunosDepois)


   await prisma.$disconnect()