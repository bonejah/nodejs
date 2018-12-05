const axios = require('axios')
const URL = `https://swapi.co/api/people`


async function getPeople(name) {
  const url = `${URL}/?search=${name}&format=json`
  const response = await axios.get(url)
  return response.data;
}

// getPeople('r2')
//   .then(function (resultado) {
//     console.log('resultado', resultado)
//   })
//   .catch(function (error) {
//     console.log('error', error)
//   })

module.exports = {
  getPeople
}