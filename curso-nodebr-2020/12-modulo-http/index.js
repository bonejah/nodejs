const http = require('http')
const port = 4000

http.createServer((req, res) => {
  res.end('Hello NodeJs')
})
.listen(port, console.log(`Server listening on port ${port}`))
