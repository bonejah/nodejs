// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function maxChar(str) {
  const charsMap = {};
  let max = 0;
  let maxChar = "";

  for (let char of str) {
    if (!charsMap[char]) {
      charsMap[char] = 1;
    } else {
      charsMap[char]++;
    }
  }

  for (let char in charsMap) {
    if (charsMap[char] > max) {
      max = charsMap[char];
      maxChar = char;
    }
  }

  return maxChar;
}

module.exports = maxChar;
