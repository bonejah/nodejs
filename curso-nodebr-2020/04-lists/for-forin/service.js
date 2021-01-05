const axios = require('axios')
const URL = `https://swapi.dev/api/people`

async function getPeople(name) {
  const url = `${URL}/?search=${name}&format=json`
  const response = await axios.get(url)
  return response.data
}


// CHAMADA DE TESTE
// getPeople('luke')
//   .then(function(result){
//     console.log(result)
//   })
//   .catch(function(error){
//     console.error('ERROR', error)
//   })

module.exports = {
  getPeople
}


