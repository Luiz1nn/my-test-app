# My Test App

## Descrição do Projeto

Este projeto fornece uma solução web intuitiva para equipes de análise de dados que necessitam trabalhar com informações extraídas de arquivos PDF. A aplicação oferece uma interface amigável e eficiente, permitindo que os usuários carreguem, visualizem e analisem dados contidos em arquivos PDF de maneira simplificada.

## Funcionalidades Principais

- Upload de PDF: Permite aos usuários fazer upload de arquivos PDF para o sistema.
- Download de conteúdo do PDF: Fornece uma interface para fazer download de todo o conteúdo dos PDFs carregados em .txt
- Download de images do PDF: Fornece uma interface para fazer download das imagens em .zip

## Tecnologias Utilizadas

- Backend: Python com Flask, responsável pelo processamento e extração de dados dos PDFs.
- Frontend: React, para criar uma interface de usuário dinâmica e responsiva.
- Banco de Dados: SQLite.
- Docker: Para containerização da aplicação e facilitar a implantação.

## Estrutura do Projeto

- my-python-app: Contém o código do backend, responsável pela lógica de extração e análise de dados.
- my-react-app: Contém o código do frontend, responsável pela interface do usuário.
- docker-compose.yml: Arquivo de configuração para orquestrar os serviços do backend e frontend usando Docker.

## Configuração do Ambiente

1. Clone o repositório:

```
  git clone https://github.com/Luiz1nn/my-test-app.git
  cd my-test-app
```

2. Modifique o arquivo `.env` do frontend `my-react-app` com as variáveis de ambiente necessárias:

```
  # Variável de conexão da API
  # Se quiser acessar o sistema por outro dispositivo na mesma rede modifique para IP da maquina que irá prover o sistema
  API_URL="http://<IP_DA_MAQUINA>:5001"
```

3. Construa e inicie os containers com Docker:

```
  docker-compose up -d
```

4. Acessa a aplicação no seu navegador:

- `http://<IP_DA_MAQUINA>:3000`
