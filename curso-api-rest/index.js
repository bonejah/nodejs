const http = require("http");
const port = 3000;
const ip = "127.0.0.1";
const server = http.createServer((request, response) => {
  console.log("URL", request.url);

  const respostas = [];
  respostas["/"] = "<h1>Home</h1>";
  respostas["/fotos"] = "<h1>Fotos</h1>";
  respostas["/contatos"] = "<h1>Contatos</h1>";
  response.end(respostas[request.url]);

  // if (request.url === "/") {
  //   response.end("<h1>Home</h1>");
  // } else if (request.url === "/fotos") {
  //   response.end("<h1>Fotos</h1>");
  // } else if (request.url === "/contatos") {
  //   response.end("<h1>Contatos</h1>");
  // } else {
  //   response.end("<meta charset='utf-8'><h1>Essa página não existe!!!</h1>");
  // }
});

server.listen(port, ip, () => {
  console.log(`Servidor iniciado em: http://${ip}:${port}`);
});
