const EventEmiter = require('events')

class MeuEmmissor extends EventEmiter {

}

const meuEmissor = new MeuEmmissor()
const nomeEvento = 'usuario.click'
meuEmissor.on(nomeEvento, function (click) {
  console.log('Um usuario clicou', click)
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem...')
// meuEmissor.emit(nomeEvento, 'no ok...')

// let count = 0
// setInterval(function () {
//   meuEmissor.emit(nomeEvento, 'na barra de rolagem...' + (count++))
// }, 1000)

const stdin = process.openStdin();
// stdin.addListener('data', function (value) {
//   console.log(`Voce digitou: ${value.toString().trim()}`)
// })

function main() {
  return new Promise(function (resolve, reject) {
    stdin.addListener('data', function (value) {
      return resolve(value)
    })
  })
}

main().then(function (resultado) {
  console.log('resultado', resultado.toString())
})