import { Router } from 'express';
import {
  listarAlunos,
  buscarAluno,
  criarAluno,
  atualizarAluno,
  deletarAluno,
} from '../controllers/alunosController.js'; 

const router = Router();

router.get('/', listarAlunos);  
router.get('/:id', buscarAluno);   
router.post('/', criarAluno);  
router.put('/:id', atualizarAluno); 
router.delete('/:id', deletarAluno);

export default router;