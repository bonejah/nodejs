const { readFile, writeFile } = require("fs");

const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// Another way to get data from json file
// const heroesJson = require('./heroes.json')

class DataBase {
  constructor() {
    this.NAME_FILE = "heroes.json";
  }

  async readFromFile() {
    const file = await readFileAsync(this.NAME_FILE, "utf8");
    return JSON.parse(file.toString());
  }

  async writeInFile(data) {
    await writeFileAsync(this.NAME_FILE, JSON.stringify(data));
    return true;
  }

  async saveHero(hero) {
    const data = await this.readFromFile();

    const id = hero.id <= 2 ? hero.id : Date.now();

    const heroWithId = {
      id,
      ...hero,
    };

    const dataFinal = [...data, heroWithId];

    const result = await this.writeInFile(dataFinal);
    return result;
  }

  async removeHero(id) {
    if (!id) {
      return await this.writeInFile([]);
    }

    const data = await this.readFromFile();
    const index = data.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
      throw Error("User does not exist");
    }

    data.splice(index, 1);
    return await this.writeInFile(data);
  }

  async updateHero(id, heroUpdate) {
    const data = await this.readFromFile();

    const index = data.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
      throw Error("User does not exist");
    }

    const heroActual = data[index];

    const heroToUpdate = {
      ...heroActual,
      ...heroUpdate,
    };

    data.splice(index, 1);

    return await this.writeInFile([...data, heroToUpdate]);
  }

  async listHero(id) {
    const heroes = await this.readFromFile();
    
    const heroesFiltered = heroes.filter((item) => id ? item.id === parseInt(id) : true);

    return heroesFiltered;
  }
}

module.exports = new DataBase();
