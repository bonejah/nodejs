var http = require('http');
var server = http.createServer(function(request, response){
  response.writeHead(200, {"Content-Type": "text/html"});

  if(request.url == "/"){
    response.write("<h1>Main page</h1>")
  }else if(request.url == "/welcome"){
    response.write("<h1>Welcome page</h1>")
  }else{
    response.write("<h1>Page not Found!</h1>")
  }
  response.end();
})

server.listen(3000, function(){
  console.log('Server listen on port 3000')
});