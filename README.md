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
# Block the package
package-lock = false

# Disable due to performance issues in Windows
progress = false

# Configuration of the repository address that should be used to install the dependencies
registry = https://registry.npmjs.org

# Instruct npm to install the exact version of the package that was requested
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

## Dotenv (Tool that dynamically loads environmentvariables in the .env file)

- https://www.npmjs.com/package/dotenv

## Mongoose (Lib data modeling that integrates MongoDM with Nodejs)

- https://mongoosejs.com/

## Express (Application framework that provides a Web Server, as well as providing a set of resources necessary to create a robust API)

- https://expressjs.com/

## Helmet (Security middleware that helps protect Express by making adjustments to HTTP headers)

- https://helmetjs.github.io/

## CORS (CORS is acronym fir Cross-Origin Resources Sharing wich stands for Cross-Source Resource Sharing. Cors is a specification that defines what and how the resources of a server can be accessed. We should configure Cors to raise the API security level)

- npm i @robertoachar/express-cors

## Compression (Performance middleware that helps Express compress the data that is trafficjked. The compression supports deflate and gzip)

- https://github.com/expressjs/compression

## body-parser (Utilities Middleware, it parses the request before arriving on the routes and provides the req.body object with the data was sent throught the requests.It supports application/json and application/x-www-form-urlenconded)

- https://github.com/expressjs/body-parser

## HTTP Status

- https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status

```
200-299 - Successful Answers
400-499 - Customer Error Responses
500-599 - Server Error Responses
```

## Healthz (It is a monitoring technique widely used by the DevOps team. It consists of periodically checking the health of the application)
