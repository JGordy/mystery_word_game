const express = require("express");
const router = express.Router();


let words = ["rebel", "chewbacca", "palindrome", "latte", "jalepenos"]



router.get("/", function(req, res) {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  console.log(randomWord);
  res.render("game");
})















module.exports = router;
