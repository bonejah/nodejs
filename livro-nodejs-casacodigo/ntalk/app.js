var express = require('express')
,   load = require('express-load')
,   app = express();

// Importante carregar os recursos abaixo na ordem
load('models')
  .then('controllers')
  .then('routes')
  .into(app);

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(3000, function(){
  console.log('NTalk no ar')
});