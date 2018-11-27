/*
1 - Obter um usuario
2 - Obter o numero de telefone do usuario a partir do seu ID
3 - Obter o endereco do usuario pelo ID
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Shazam',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(function () {
        return callback(null, {
            numero: '123456789',
            ddd: 11
        })
    }, 1000)
}


function obterEndereco(idUsuario, callback) {
    setTimeout(function () {
        return callback(null, {
            rua: 'Rua do NODE',
            numero: 177
        })
    }, 1000)
}

function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario)
}

function resolverTelefone(erro, telefone) {
    console.log('telefone', telefone)
}

function resolverEndereco(erro, endereco) {
    console.log('telefone', endereco)
}

// const usuario = obterUsuario()
// const telefone = obterTelefone(usuario.id)

obterUsuario(function resolverUsuario(error, usuario) {
    // null || "" || 0 === false
    if (error) {
        console.log('Deu ERRO em usuario', error)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if (error) {
            console.log('Deu ERRO em telefone', error)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if (error) {
                console.log('Deu ERRO em endereco', error)
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua} - ${endereco.numero},
                Telefone: (${telefone.ddd})${telefone.numero}
            `)
        })
    })
})

// console.log('telefone', telefone)