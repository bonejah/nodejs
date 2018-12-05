const { getPeople } = require('./service');

Array.prototype.meuFilter = function (callback) {
  const lista = [];

  for (index in this) {
    const item = this[index]
    const result = callback(item, index, this)
    //0, "", null, undefinied === false
    if (!result) continue;
    lista.push(item)
  }

  return lista;
}

async function main() {
  try {
    const { results } = await getPeople('a')

    const familyLars = results.filter(function (item) {
      const result = item.name.toLowerCase().indexOf(`lars`) !== -1
      return result
    })
    const names = familyLars.map((pessoa) => pessoa.name)
    console.log('names', names)

    const familyLars2 = results.meuFilter((item, index, lista) => {
      console.log(`index: ${index}`, lista.length)
      return item.name.toLowerCase().indexOf(`lars`) !== -1
    })

    const names2 = familyLars2.map((pessoa) => pessoa.name)
    console.log('names2', names2)


  } catch (error) {
    console.error('error', error)
  }
}

main()