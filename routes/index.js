const express = require("express");
const router = express.Router();


let words = ["rebel", "chewbacca", "palindrome", "latte", "jalepenos"];
let randomWord;

router.get("/", function(req, res) {
  randomWord = words[Math.floor(Math.random() * words.length)];
  console.log(randomWord);

  let word = [];
  for (var i = 0; i < randomWord.length; i++) {
    let letters = {letter: randomWord[i],
                    guessed: false,
                  placeholder: "_"}
    word.push(letters)
  }
  res.render("game",{word: word});
})

// when guessing a letter, make a post
// if statment for if the letter is contained inside of "randomWord" If so change guess to true. If not add the letter to letters guessed
// also in the "if" correct guesses don't count against the player. Incorrect guesses should subtract from the total number of guesses
router.post("/game", function(req, res) {
  if (req.body.letter === randomWord.includes(req.body.letter)) {

  }
console.log(req.body.letter);
})















module.exports = router;
