const ICrud = require('./../interfaces/interfaceCrud')

// Class Mongo implemented ICrud
class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Item was saved on MongoDB");
  }
}

module.exports = MongoDB
