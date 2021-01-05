// Exception Class
class NotImplementedException extends Error {
  constructor() {
    super("Not Implemented Exception");
  }
}

// Simulate an Inteface
class ICrud {
  create(item) {
    throw new NotImplementedException();
  }

  read(query) {
    throw new NotImplementedException();
  }

  update(id, item) {
    throw new NotImplementedException();
  }

  delete(id) {
    throw new NotImplementedException();
  }
}

// Class Mongo implemented ICrud
class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Item was saved on MongoDB");
  }
}

// Class Postgres implemented ICrud
class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Item was saved on Postgres");
  }
}

// Class abstract for Strategy
class ContextStrategy {
  constructor(strategy) {
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  }

  read(item) {
    return this._database.read(item);
  }

  updatee(id, item) {
    return this._database.update(id, item);
  }

  delete(id) {
    return this._database.delete(id);
  }
}

// Tests
const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create("")

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create("")

contextPostgres.read()