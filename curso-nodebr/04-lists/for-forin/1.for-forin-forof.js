const service = require('./service')

async function main() {
  try {
    const result = await service.getPeople('vader')
    const names = []

    console.time('for')
    for (let i = 0; i < result.results.length; i++) {
      const pessoa = result.results[i];
      names.push(pessoa.name)
    }
    console.timeEnd('for')
    console.log('names', names)

    console.time('forin')
    for (let i in result.results) {
      const pessoa = result.results[i];
      names.push(pessoa.name)
    }
    console.timeEnd('forin')
    console.log('names', names)

    console.time('forof')
    for (pessoa of result.results) {
      const pessoa = result.results;
      names.push(pessoa.name)
    }
    console.timeEnd('forof')
    console.log('names', names)

  } catch (error) {
    console.error('error intern', error)
  }
}

main()