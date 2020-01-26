// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

// Solution 1
// function reverse(str) {
//   const arr = str.split("");
//   arr.reverse();
//   return arr.join("");
// }

// Solution 1.2
// function reverse(str) {
//   return str
//     .split("")
//     .reverse()
//     .join("");
// }

// Solution 2
function reverse(str) {
  let reverse = "";

  for (let character of str) {
    reverse = character + reverse;
    debugger;
  }

  return reverse;
}

// Solution 3
// function reverse(str) {
//   debugger;
//   return str.split("").reduce((rev, char) => char + rev, "");
// }

reverse("ola");

module.exports = reverse;
