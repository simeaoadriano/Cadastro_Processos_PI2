# Sistema de Gerenciamento de Clientes e Processos Jurídicos

Este é um projeto de sistema web para gestão de clientes e processos jurídicos. O sistema permite o cadastro de usuários, autenticação, gerenciamento de clientes e processos, e possui funcionalidades básicas de CRUD (Create, Read, Update, Delete).

## Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express
  - MySQL
  - bcrypt (para criptografia de senhas)
  - body-parser (para manipulação de dados no formato JSON)
  
- **Frontend**:
  - React
  - React Router
  - Axios (para consumo de API)
  - React Modal

## Rodando o Projeto Localmente

### Backend

1. Instale as dependências do Backend: Navegue até a pasta `backend` e instale as dependências:

    ```bash
    cd backend
    npm install
    ```

2. Configure o banco de dados MySQL:

    - Crie um banco de dados chamado `adv`.
    - Atualize as credenciais de conexão no arquivo `config/db.js` com as configurações do seu MySQL local.

3. Rodando o Backend:

    - Inicie o servidor backend:

    ```bash
    npm start
    ```

    - O servidor estará disponível em [http://localhost:5000](http://localhost:5000).

### Frontend

1. Instale as dependências do Frontend: Navegue até a pasta `client` e instale as dependências:

    ```bash
    cd ../client
    npm install
    ```

2. Rodando o Frontend:

    - Inicie o servidor frontend:

    ```bash
    npm start
    ```

    - O frontend estará disponível em [http://localhost:3000](http://localhost:3000).

Agora você poderá acessar a aplicação no seu navegador, onde o frontend se comunica com o backend via as rotas definidas.

## Exemplos de Uso

1. **Registrar um novo usuário**

    **POST** `/api/auth/register`

    **Body**:
    ```json
    {
      "nome": "João da Silva",
      "email": "joao@exemplo.com",
      "senha": "senha123"
    }
    ```

2. **Login de um usuário**

    **POST** `/api/auth/login`

    **Body**:
    ```json
    {
      "email": "joao@exemplo.com",
      "senha": "senha123"
    }
    ```

3. **Cadastrar um cliente**

    **POST** `/api/clientes`

    **Body**:
    ```json
    {
      "nome": "Maria Oliveira",
      "cpf": "12345678901",
      "processo": "0012345"
    }
    ```

4. **Atualizar um cliente**

    **PUT** `/api/clientes/:id`

    **Body**:
    ```json
    {
      "nome": "Maria Oliveira Silva",
      "cpf": "12345678901",
      "processo": "0012346"
    }
    ```

5. **Excluir um cliente**

    **DELETE** `/api/clientes/:id`

## Contribuindo

Se você deseja contribuir com este projeto, siga as etapas abaixo:

1. Fork o repositório.
2. Crie uma branch para a sua feature (git checkout -b minha-feature).
3. Realize as alterações e faça um commit (git commit -am 'Adiciona nova feature').
4. Envie para o repositório (git push origin minha-feature).
5. Abra um pull request.


