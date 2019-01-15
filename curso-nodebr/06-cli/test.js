const { deepEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Lanterna Verde',
  poder: 'Energia do Anel',
  id: 2
}

describe('Suite de manipulacao de herois', () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
  })

  it('deve pesquisar um heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const [resultado] = await database.listar(expected.id)
    deepEqual(resultado, expected)
  })

  it('deve cadastrar um heroi, usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
    deepEqual(atual, expected)
  })

  it('deve remover um heroi por id', async () => {
    const expected = true
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
    deepEqual(resultado, expected)
  })

  it('deve atualizar um heroi por id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Inteligencia'
    }
    const resultado = 
  })

})