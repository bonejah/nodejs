const service = require("./service");

Array.prototype.myMap = function (callback) {
  const resultMap = [];

  for (let index = 0; index <= this.length - 1; index++) {
    const result = callback(this[index], index);
    resultMap.push(result);
  }

  return resultMap;
};

async function main() {
  try {
    const result = await service.getPeople("");

    // const names = []
    // result.results.forEach(function(item) {
    //   names.push(item.name)
    // })

    // const names = result.results.map(function (people) {
    //   return people.name
    // })

    // const names = result.results.map((people) => people.name)

    const names = result.results.meuMap(function (people, index) {
      return `[${index}]${people.name}`
    });

    console.log("NAMES", names);
  } catch (error) {
    console.error("ERROR", error);
  }
}

main();
