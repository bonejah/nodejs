const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
  Commander
    .version('v1')
    .option('-n, --nome[value]', "Nome do Heroi")
    .option('-p, --poder[value]', "Poder do Heroi")
    .option('-c, --cadastrar', "Cadastrar um Heroi")
    .parse(process.argv)

  console.log(Commander)
  const heroi = new Heroi(Commander)

  try {
    if (Commander.cadastrar) {
      console.log(heroi)
      const resultado = await Database.cadastrar(heroi)
      if (!resultado) {
        console.error('Heroi não foi cadastrado!')
        return
      }

      console.log('Heroi cadastrado com sucesso!!!')
    }
  } catch (error) {
    console.error('Deu erro', error)
  }

}

main()