const TEXT = 'Текст — это зафиксированная человеческая мысль, связная и полная последовательность предложений, объединенных общей темой, смыслом и структурой';

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
  "-", "=", "[", "]", "\\",
  ";", "'", ",", ".", "/", "`",

  // shifted symbols
  "_", "+", "{", "}", "|",
  ":", "\"", "<", ">", "?", "~",

  // whitespace
  " ",
  "Tab",
  "Enter",
]);

const board = document.getElementById('board')

document.addEventListener('keydown', (event) => {
  if (allowedKeys.has(event.key)) {
		
		board.textContent += event.key; 
  }
})
