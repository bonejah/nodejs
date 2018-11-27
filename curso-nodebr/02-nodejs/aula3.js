/*
1 - Obter um usuario
2 - Obter o numero de telefone do usuario a partir do seu ID
3 - Obter o endereco do usuario pelo ID
*/

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

const usuarioPromise = obterUsuario()
usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id)
      .then(function resolverTelefone(result) {
        return {
          usuario: {
            id: usuario.id,
            nome: usuario.nome
          },
          telefone: result
        }
      });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id)
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    });
  })
  .then(function (resultado) {
    console.log('resultado', resultado)
  })
  .catch(function (error) {
    console.log('error', error)
  })

