const ICrud = require('../interfaces/interfaceCrud')

// Class Postgres implemented ICrud
class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Item was saved on Postgres");
  }
}

module.exports = Postgres