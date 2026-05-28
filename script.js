const TEXT =
  "В древности библиотеки представляли собой хранилища глиняных табличек и папирусных свитков, доступ к которым имели лишь избранные. Сегодня развитие цифровых технологий и интернета делает информацию доступной каждому человеку на планете всего в несколько кликов.";

const allowedKeys = new Set([
  // digits
  ..."1234567890",

  // shifted digits
  ..."!@#$%^&*()",

  // latin
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",

  // cyrillic
  ..."йцукенгшщзхъфывапролджэячсмитьбюё",
  ..."ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮЁ",

  // symbols
  "-",
  "=",
  "[",
  "]",
  "\\",
  ";",
  "'",
  ",",
  ".",
  "/",
  "`",

  // shifted symbols
  "_",
  "+",
  "{",
  "}",
  "|",
  ":",
  '"',
  "<",
  ">",
  "?",
  "~",

  // whitespace
  " ",
  "Tab",
  "Enter",
]);

const board = document.getElementById("board");

document.addEventListener("keydown", (event) => {
  if (allowedKeys.has(event.key)) {
    board.textContent += event.key;
  }
});
