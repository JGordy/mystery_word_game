const express = require("express");
const router = express.Router();
const fs = require("fs");

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let randomWord;
let word = [];
let remaining;

router.get("/", function(req, res) {
  if (word == '') {
    randomWord = words[Math.floor(Math.random() * words.length)];
    console.log("randomWord; ", randomWord);

    for (var i = 0; i < randomWord.length; i++) {
      let letters = {letter: randomWord[i],
                      guessed: false,
                    placeholder: "_"}
      word.push(letters);
    }
    remaining =  {remainingGuesses: 8}
    word.push(remaining);

    res.render("game",{word: word});
  } else {
    res.render("game", {word: word});
  }
});

// also in the "if" correct guesses don't count against the player. Incorrect guesses should subtract from the total number of guesses
router.post("/game", function(req, res) {
  let temp = req.body.letter;
  // test
  index = word.findIndex(x => x.remainingGuesses);

  console.log(index);
  //end test
  if (randomWord.includes(temp)) {
    word.forEach(function(single){
      if (single.letter == req.body.letter) {
        single.guessed = true;
          res.redirect("/");
      } else {
          // else statement
      }
    })
  } else {

    word[index].remainingGuesses -= 1;

    let guess = {
      singleGuess: req.body.letter,
    }

    word.push(guess)
    console.log(word);

    res.redirect("/")
  }

});















module.exports = router;
