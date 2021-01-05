const { getPeople } = require("./service");


Array.prototype.myReduce = function (callback, initialValue) {
  let resultFinal = typeof initialValue !== undefined ? initialValue : this[0]

  for (let index = 0; index <= this.length -1; index++) {
    resultFinal = callback(resultFinal, this[index], this)
  }
  
  return resultFinal;
};

async function main() {
  try {
    const { results } = await getPeople("");

    const height = results.map(item => parseInt(item.height))
    // console.log('height', height)

    // const total = height.reduce((previous, next) => {
    //   return previous + next
    // }, 0)

    // console.log(total);

    const myList = [
      ['Bruno', 'Lima'],
      ['Java', 'na veia'],
      ['Node', 'be loving']
    ]

    const finalList = myList.myReduce((previous, next) => {
      return previous.concat(next)
    }, [])
    .join(', ')

    console.log(finalList);
  } catch (error) {
    console.error(error);
  }
}

main()