export default function logger(req, res, next) {
  const inicio = Date.now();
  res.on('finish', () => {
    const duracao = Date.now() - inicio;      
    const agora = new Date().toISOString();  
    const metodo = req.method;   
    const url = req.originalUrl;  

    console.log(`[${agora}] ${metodo} ${url} → ${res.statusCode} (${duracao}ms)`);
  });

  next();
}
