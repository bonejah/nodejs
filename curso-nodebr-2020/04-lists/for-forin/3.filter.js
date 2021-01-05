const { getPeople } = require("./service");

Array.prototype.myFilter = function (callback) {
  const resultFinal = [];

  for (index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    // 0, "", null, undefined === false

    if (!result) continue;
    resultFinal.push(item);
  }

  return resultFinal;
};

async function main() {
  try {
    const { results } = await getPeople("");

    // const familyLars = results.filter(function (item) {
    //   // false => remove from the list
    //   // true => maintain on the list
    //   // not found encontrou == -1
    //   // founded == index on array
    //   const result = item.name.toLowerCase().indexOf(`lars`) !== -1;
    //   return result;
    // });

    const familyLars = results.myFilter((item, index, list) => {
      console.log(`index: ${index}`, list.length)
      return item.name.toLowerCase().indexOf('lars') !== -1
    })
    
    const names = familyLars.map((person) => person.name);

    console.log(names);
  } catch (error) {
    console.error(error);
  }
}

main();
