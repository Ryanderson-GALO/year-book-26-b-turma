# API do Yearbook — Documentação de Endpoints

    Base URL (produção): `https://yearbook-backend.vercel.app`

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - O campo `senhaHash` nunca é retornado em nenhuma resposta
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`

    ## CORS

   Esta API tem CORS habilitado para qualquer origem. Você pode consumi-la
   de qualquer domínio (localhost, Vercel, etc.) sem configuração adicional
   no cliente.

## Auth

### POST /auth/register

Cria uma nova conta de aluno.

- **Autenticação:** Não
- **Body:**

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "minhasenha123",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG"
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `400` — Campos obrigatórios ausentes
  - `409` — Email já cadastrado

### POST /auth/login

Autentica um aluno e retorna um token JWT.

- **Autenticação:** Não
- **Body:**

```json
{
  "email": "maria@email.com",
  "senha": "minhasenha123"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Erros:**
  - `401` — Credenciais inválidas (email não existe ou senha incorreta)

## Alunos

### GET /alunos

Lista todos os alunos cadastrados.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "cidade": "Salinas",
    "frase": "Aqui começa o futuro.",
    "planosFuturos": "Cursar Ciência da Computação na UFMG",
    "fotoUrl": null,
    "role": "USER",
    "criadoEm": "2026-04-03T10:30:00.000Z"
  }
]
```

- **Erros:** Nenhum esperado

### GET /alunos/:id

Busca um aluno específico pelo ID.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `404` — Aluno não encontrado

### PUT /alunos/:id

Atualiza o próprio perfil.

- **Autenticação:** Bearer token
- **Body:**

```json
{
  "nome": "Maria Silva",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": "https://ucarecdn.com/abc123/"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": "https://ucarecdn.com/abc123/",
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `401` — Token ausente ou inválido
  - `403` — Tentativa de atualizar o perfil de outro aluno
  - `404` — Aluno não encontrado

### DELETE /alunos/:id

Remove um aluno. Apenas o `ADMIN` pode executar esta ação.

- **Autenticação:** Bearer token (admin)
- **Body:** Nenhum
- **Resposta de sucesso:** `204 No Content`
- **Erros:**
  - `401` — Token ausente ou inválido
  - `403` — Usuário não é admin
  - `404` — Aluno não encontrado

## Mensagens

### GET /mensagens

Lista todas as mensagens do mural.

- **Autenticação:** Não
- **Body:** Nenhum
- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "texto": "Parabéns a todos!",
    "imagemUrl": null,
    "autorId": 1,
    "criadoEm": "2026-04-05T14:30:00.000Z",
    "autor": {
      "id": 1,
      "nome": "Maria Silva",
      "fotoUrl": null
    }
  }
]
```

- **Erros:** Nenhum esperado

### POST /mensagens

Cria uma nova mensagem no mural.

- **Autenticação:** Bearer token
- **Body:**

```json
{
  "texto": "Foi uma jornada incrível!",
  "imagemUrl": "https://ucarecdn.com/foto456/"
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 3,
  "texto": "Foi uma jornada incrível!",
  "imagemUrl": "https://ucarecdn.com/foto456/",
  "autorId": 1,
  "criadoEm": "2026-04-06T09:00:00.000Z"
}
```

- **Erros:**
  - `400` — Campo `texto` ausente
  - `401` — Token ausente ou inválido

### DELETE /mensagens/:id

Remove uma mensagem do mural.

- **Autenticação:** Bearer token
- **Body:** Nenhum
- **Resposta de sucesso:** `204 No Content`
- **Erros:**
  - `401` — Token ausente ou inválido
  - `403` — Usuário não é o dono da mensagem nem admin
  - `404` — Mensagem não encontrada