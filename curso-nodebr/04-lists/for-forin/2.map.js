const service = require('./service');

Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = []

  for (let index = 0; index <= this.length - 1; index++) {
    const resultado = callback(this[index], index)
    novoArrayMapeado.push(resultado)
  }

  return novoArrayMapeado;
}

async function main() {
  try {
    const results = await service.getPeople('a')

    const names = []
    results.results.forEach(function (item) {
      names.push(item.name)
    })

    // const namesMap = results.results.map(function (pessoa) {
    //   return pessoa.name;
    // })
    const namesMap = results.results.map(pessoa => pessoa.name)

    const namesMyMap = results.results.meuMap(function (pessoa, indice) {
      return `[${indice}]${pessoa.name}`;
    })

    console.log('names', names)
    console.log('namesMap', namesMap)
    console.log('namesMyMap', namesMyMap)
  } catch (error) {
    console.error('error', renderError)
  }
}

main()