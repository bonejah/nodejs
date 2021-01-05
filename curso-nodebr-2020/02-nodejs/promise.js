/*
0 - Get a user
1 - Get phone number user searching by user id
2 - Get phone address user searching by user id 
*/

// Importing an internal module Node
const util = require('util');
const getAddressAsync = util.promisify(getAddress)

function getUser() {
  return new Promise(function resolvePromise(resolve, reject) {
    // return reject(new Error('ERROR :('))

    setTimeout(function () {
      return resolve({
        id: 1,
        name: "Aladin",
        dateBirthday: new Date(),
      });
    }, 1000);
  })
}

function getPhone(idUser) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        phone: "1199999-2356",
        ddd: 11,
      });
    }, 1000);
  })
}

function getAddress(idUsuario, callback) {
  setTimeout(function () {
      return callback(null, {
        street: "dos bobos",
        number: 0,
      });
    }, 1000);
}

/**
 * Using PROMISES
 */

 const userPromise = getUser()
 userPromise
  .then(function(user) {
    return getPhone(user.id)
      .then(function resolverPhone(returnGetPhone){
        return {
          user: {
            name: user.nome,
            id: user.id
          },
          phone: returnGetPhone
        }
      })
  })
  .then(function(return1Then){
    const address = getAddressAsync(return1Then.user.id)
    return address.then(function resolverAddress(returnGetAddressAsync) {
      return {
        user: return1Then.user,
        phone: return1Then.phone,
        address: returnGetAddressAsync
      }
    })
  })
  .then(function(objFinal) {
    console.log('RESULT', `
      Name: ${objFinal.user.name},
      Address: ${objFinal.address.street}, ${objFinal.address.number},
      Phone: (${objFinal.phone.ddd}) ${objFinal.phone.phone}
    `)
  })
  .catch(function(error) {
    console.log('ERROR', error)
  })
  