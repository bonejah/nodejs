const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: 'Shazam',
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        numero: '123456789',
        ddd: 11
      })
    }, 1000)
  })
}

function obterEndereco(idUsuario, callback) {
  setTimeout(function () {
    return callback(null, {
      rua: 'Rua do NODE',
      numero: 177
    })
  }, 1000)
}

main()
async function main() {
  try {

    console.time('medida-promise')

    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)

    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const telefone = resultado[0]
    const endereco = resultado[1]

    console.log(`
    Nome: ${usuario.nome},
    Endereco: ${endereco.rua} - ${endereco.numero},
    Telefone: (${telefone.ddd})${telefone.numero}
`)

    console.timeEnd('medida-promise')
  } catch (error) {
    console.log('error', error)
  }
}