import fs from 'fs';

/**
 * Finds a circular arrangement of words in the given dictionary.
 * A circular arrangement is a sequence of words where the last letter of each word
 * matches the first letter of the next word, and the last word's last letter
 * matches the first word's first letter.
 * 
 * @param {string[]} dictionary An array of words to search for a circular arrangement.
 * @returns {string[]|string} An array of words representing a circular arrangement,
 *                           or a message "The dictionary does not form a circle.".
 */
function findCircularArrangement(dictionary) {
  //Time to test performance
  console.time("findCircularArrangement");
  const message = "The dictionary does not form a circle.";
  const filteredDictionary = filterWords(dictionary);

  if (dictionary.length !== filteredDictionary.length) {
    return message;
  }

  //We could sort the array if we want but in this case it is not necessary.

  for (let i = 0; i < dictionary.length; i++) {
    let circle = [dictionary[i]];
    let remainingWords = dictionary.slice(0, i).concat(dictionary.slice(i + 1));
    let success = buildCircle(circle, remainingWords);

    if (success) {
      //End time to test performance
      console.timeEnd("findCircularArrangement");
      return circle;
    }
  }
  //End time to test performance
  console.timeEnd("findCircularArrangement");
  return message;
}

/**
 * Recursively builds a circular arrangement of words.
 * 
 * @param {string[]} circle The current circular arrangement being built.
 * @param {string[]} remainingWords The remaining words to be added to the circle.
 * @returns {boolean} True if a circular arrangement was successfully built, false otherwise.
 */
function buildCircle(circle, remainingWords) {

  //If there are no remaining words, check if the circle is valid and condition to step out of the recursive function
  if (remainingWords.length === 0) {
    if(circle[circle.length - 1][circle[circle.length - 1].length - 1] === circle[0][0]){
      fs.writeFileSync(outputPath, circle.join('\n'));
      return true;
    }
  }

  // Try adding each remaining word to the circle
  for (let i = 0; i < remainingWords.length; i++) {
    let nextWord = remainingWords[i];
    // Check if the next word can be added to the circle
    if (circle[circle.length - 1][circle[circle.length - 1].length - 1] === nextWord[0]) {
    
      let newCircle = circle.concat([nextWord]);
      let newRemainingWords = remainingWords.slice(0, i).concat(remainingWords.slice(i + 1));
      //Call itself (recursive)
      let success = buildCircle(newCircle, newRemainingWords);
     
      if (success) {
        circle.splice(0, circle.length, ...newCircle);
        return true;
      }
    }
  }

  return false;
}


/**
 * Filters the words in the dictionary to include only those containing alphabetic characters.
 * 
 * @param {string[]} dictionary The array of words to filter.
 * @returns {string[]} An array of words containing only alphabetic characters.
 */
function filterWords(dictionary) {
  const pattern = /^[a-zA-Z]+$/;
  return dictionary.filter(word => pattern.test(word));
}

// Example usage
const standardTest = ['chair','height','touch','tunic','racket'];
//Other test scenario
const circleLong =  ['apple', 'elk',  'kangaroo', 'ostrich',  'hamster', 'rabbit', 'tiger', 'raccoon', 'nightale','elephant','tea'];
const outputPath = 'output.txt';
const result = findCircularArrangement(standardTest);
console.log("Final Result: ", result);