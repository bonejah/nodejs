const Commander = require("commander");
const database = require("./database");
const Hero = require("./hero");

async function main() {
  Commander.version("v1")
    .option("-h, --hero [value]", "Hero name")
    .option("-p, --power [value]", "Hero power")
    .option("-i, --id [value]", "Hero id")

    .option("-s, --save", "Save a hero")
    .option("-l, --list", "Search a hero")
    .option("-r, --remove", "Remove a hero by id")
    .option("-u, --update [value]", "Update a hero")
    .parse(process.argv);

  const hero = new Hero(Commander);
  
  try {
    if (Commander.save) {
      delete hero.id;

      const result = await database.saveHero(hero);

      if (!result) {
        console.log("Error on save hero");
        return;
      }

      console.log("Hero saved with success!!!");
    }

    if (Commander.list) {
      const result = await database.listHero(hero.id ? hero.id : "");
      return;
    }

    if (Commander.remove) {
      const result = await database.removeHero(hero.id);
      if (!result) {
        console.error("Error on remove hero");
        return;
      }

      console.log("Hero removed with success!");
    }

    if (Commander.update) {
      const idToUpdate = parseInt(Commander.update);

      // remove all keys with value undefinied or null
      const data = JSON.stringify(hero);
      const heroToUpdate = JSON.parse(data);
      
      const result = await database.updateHero(idToUpdate, heroToUpdate);

      if (!result) {
        console.error("Error on update hero");
        return;
      }

      console.log("Hero updated with success");
    }
  } catch (error) {
    console.error(error);
  }
}

main();
