import prisma from '../prisma/client.js';
export async function listarMensagens(req, res) {
  const mensagens = await prisma.mensagem.findMany({
    orderBy: { criadoEm: 'desc' },  
    include: {
      autor: {                        
        select: {
          nome: true,                
          fotoUrl: true,              
        },
      },
    },
  });
  res.json(mensagens);
}


export async function criarMensagem(req, res) {
  const { texto, imagemUrl, autorId } = req.body;

  if (!texto) {
    return res.status(400).json({ erro: 'O campo texto é obrigatório' });
  }

  const mensagemCriada = await prisma.mensagem.create({
    data: {
      texto,
      imagemUrl,
      autorId: Number(autorId),
    },
  });

  res.status(201).json(mensagemCriada);
}


export async function deletarMensagem(req, res) {
  const { id } = req.params;

  try {
    await prisma.mensagem.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (erro) {
    res.status(404).json({ erro: 'Mensagem não encontrada' });
  }
}
