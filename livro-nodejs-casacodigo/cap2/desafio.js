const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

// Function para gerenciamento de rotas
const rotear = function(pathname){
  if(pathname && pathname !== '/'){
    const arquivo = path.join(__dirname, `${pathname}.html`)
    const existe = fs.existsSync(arquivo)

    if(existe){
      return arquivo;
    }

    return path.join(__dirname, 'erro.html');
  }

  return path.join(__dirname, 'artigos.html');
};

// Start Server
const server = http.createServer(function(request, response){
  const pathname = url.parse(request.url).pathname
  const pagina = rotear(pathname)

  fs.readFile(pagina, (err, html) => {
    response.writeHeader(200, {'Content-Type':'text/html'})
    response.end(html)
  })
})

server.listen(3000, () => {
  console.log('Listen Server port 3000')
})