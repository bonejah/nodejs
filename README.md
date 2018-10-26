# NodeJS

> Repo contains many examples using Node technology

## Commands Node

```
node -v: show the version node

npm -v: show the version npm (Node Package Manager)

npm i -g npm: update to last version npm

npm init: initialize a new project with a file package.json

npm i -D eslint: install ESLint on project

npm i -D prettier eslint-config-prettier eslint-plugin-prettier: install Prettier


File .npmrc
# Bloqueia o package
package-lock = false

# Desabilitado por problemas de performance no Windows
progress = false

# Configuração do endereço do repositório que deverá ser utilizado para instalar as dependência
registry = https://registry.npmjs.org

# Instruir o npm a instalar a versão exata do pacote que foi solicitado
save-exact = true
```

## EditorConfig

```
- https://editorconfig.org/
```

## MongoDB

### Local Installation

```
https://docs.mongodb.com/manual/administration/install-on-linux/
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
```

### Remote Installation

```
https://mlab.com/signup/
```

## Nodemon (Deploy automatic)

- https://nodemon.io/

## Winston (Lib for logs)

- https://github.com/winstonjs/winston

## Dotenv (Ferramenta que carrega variaveis de ambiente dinamicamente no arquivo .env)

- https://www.npmjs.com/package/dotenv

## Mongoose (Lib de modelagem de dados que integra o MongoDB ao Nodejs)

- https://mongoosejs.com/

## Express (framework de aplicação que disponibiliza um servidor Web, além de fornecer um conjunto de recursos necessários para a criação de uma API robusta)

- https://expressjs.com/

## Helmet (middleware de segurança que ajuda a proteger o Express, fazendo ajustes nos cabeçalhos HTTP)

- https://helmetjs.github.io/

## CORS (CORS é o acrônimo para Cross-Origin Resource Sharing que significa Compartilhamento de Recursos de Origem Cruzada. CORS é uma especificação que define quais e como os recursos de um servidor podem ser acessados. Devemos configurar o CORS para elevar o nível de segurança da API)

- npm i @robertoachar/express-cors

## Compression (middleware de desempenho que auxilia o Express a comprimir os dados que são trafegados. O compression suporta deflate e gzip.

- https://github.com/expressjs/compression

## body-parser (Middleware de utilidades, ele analisa (parse) a requisição antes de chegar nas rotas e disponibiliza o objeto req.body com os dados que foram enviados através das requisições. Ele suporta application/json e application/x-www-form-urlencoded)

- https://github.com/expressjs/body-parser

## Status HTTP

- https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

```
200-299 - Respostas de sucesso
400-499 - Respostas de erro do Cliente
500-599 - Respostas de erro do Servidor
```

## Healthz (É uma técnica de monitoramento muito utilizada pelo time de DevOps. Ela consiste em verificar periodicamente a "saúde" (health) da aplicação)


