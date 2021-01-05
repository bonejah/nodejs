/*
0 - Get a user
1 - Get phone number user searching by user id
2 - Get phone address user searching by user id 
*/


// Importing an internal module Node
const util = require("util");
const getAddressAsync = util.promisify(obterEndereco);

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
 * Using async await
 */

async function main() {
  try {
    // Catch time execution
    console.time("time-promise");

    const user = await getUser();
    // const phone = await getPhone(user.id)
    // const address = await getAddressAsync(user.id)

    // Using parallelism
    const result = await Promise.all([
      getPhone(user.id),
      getAddressAsync(user.id),
    ]);

    const phone = result[0];
    const address = result[1];

    console.log(
      "RESULT",
      `
      Name: ${user.nome},
      Phone: (${phone.ddd}) ${phone.phone}
      Address: ${address.street}, ${address.number},
     `
    );

    console.timeEnd("time-promise");
  } catch (error) {
    console.error("ERROR", error);
  }
}

main();
