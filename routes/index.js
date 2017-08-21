const express = require("express");
const router = express.Router();
const fs = require("fs");

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let randomWord;
let word = [];
let remaining;
let messages = []

router.get("/", function(req, res) {
  if (!req.session.word) {
    remaining =  {remainingGuesses: 8};
    randomWord = words[Math.floor(Math.random() * words.length)];
    console.log("randomWord: ", randomWord);

    for (var i = 0; i < randomWord.length; i++) {
      let letters = {letter: randomWord[i],
                      guessed: false,
                    placeholder: "_"}
      word.push(letters);
    }
    word.push(remaining);
    req.session.word = word;
    req.session.token = "jjrttuu677"
    // console.log(req.session.word);
    res.render("game",{word: word});
  } else {
    res.render("game", {word: word});
  }
});

router.post("/game", function(req, res) {

  let temp = req.body.letter;
  // finding the index of "remainingGuesses" and guessed: false
  index = word.findIndex(x => x.remainingGuesses);

  req.checkBody("letter", "Guesses must contain only 1 letter!").len(1, 1);
  req.checkBody("letter", "Guesses cannot be numbers or special characters!").isAlpha();

  let errors = req.getValidationResult();

  errors.then(function(result) {
      result.array().forEach(function(error) {
        messages.push({message: error.msg});
        word.push({message: error.msg})
      });

      let errObject = {
        errors: messages,
        info: req.body
      };

//////////////////////////////////////////////
      if (randomWord.includes(temp)) {
        word.forEach(function(single){
          if (single.letter === req.body.letter) {
            single.guessed = true;
            let wordGuessed = word.findIndex(y => y.guessed == false)
            if (wordGuessed == -1) {
              res.render("winner", {word: word});
            } else {
              res.redirect("/");
            }
          }
        })
      } else if (word[index].remainingGuesses === 1) {
        word[index].remainingGuesses = '';
        let guess = {
          singleGuess: req.body.letter,
        }
        word.push(guess);
        res.render("loser", {word: word});
      } else if (!randomWord.includes(temp)) {
        word[index].remainingGuesses -= 1;
        let guess = {
          singleGuess: req.body.letter,
        }
        messages = [];
        word.push(guess)
        res.redirect("/")
      } else if (messages !== []) {
        res.redirect("/");
        messages = [];
      }
    }); /// end of errors.then
// console.log("word: ", word);
});

router.post("/reset", function(req, res) {
  word = [];
  messages = [];
  req.session.destroy(function(err) {
  console.log("Error: ", err);
});
res.redirect("/");
})

module.exports = router;
