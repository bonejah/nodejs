

function getUser(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      name: "Aladin",
      dateBirthday: new Date(),
    });
  }, 1000);
}

function getPhone(idUser, callback) {
  setTimeout(function () {
    return callback(null, {
      phone: "1199999-2356",
      ddd: 11,
    });
  }, 1000);
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
 * Callback functions to execute them in chain 
 */

getUser(function resolverUser(error, user) {
  // null || "" || 0 === false
  if (error) {
    console.error("ERROR GET USER", error);
    return;
  }

  getPhone(user.id, function resolverPhone(error1, phone) {
    // null || "" || 0 === false
    if (error1) {
      console.error("ERROR GET PHONE", error1);
      return;
    }

    getAddress(user.id, function resolverAddress(error2, address) {
      // null || "" || 0 === false
      if (error2) {
        console.error("ERROR GET ADDRESS", error2);
        return;
      }

      console.log(`
        Name: ${user.nome},
        Address: ${address.street}, ${address.number},
        Phone: (${phone.ddd})${phone.phone}
      `);
    });
  });
});
