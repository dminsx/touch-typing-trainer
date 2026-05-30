const board = document.querySelector(".board");

const TEXT =
  "В древности библиотеки представляли собой хранилища глиняных табличек и папирусных свитков, доступ к которым имели лишь избранные. Сегодня развитие цифровых технологий и интернета делает информацию доступной каждому человеку на планете всего в несколько кликов.";
const invalidKeys = ["Shift", "Meta", "Control", "Alt", "GroupNext"];

let textIndex = 0;
let textWrong = false;

function createSpan() {
  const span = document.createElement("span");
  span.classList.add("text");
  board.append(span);
  return span;
}

Array.from(TEXT).forEach((letter) => {
  createSpan().append(letter);
});

const text = document.querySelectorAll(".text");

text[textIndex].classList.add("text--current");

document.addEventListener("keydown", (event) => {
  if (invalidKeys.includes(event.key)) {
    return;
  }

  if (event.key === " ") {
    event.preventDefault();
  }

  if (textWrong) {
    if (event.key === "Backspace") {
      text[textIndex].classList.remove("text--wrong");
      text[textIndex].classList.add("text--current");
      textWrong = false;
      return;
    }
    return;
  }

  if (event.key === TEXT[textIndex]) {
    text[textIndex + 1].classList.add("text--current");
    text[textIndex].classList.remove("text--current");
    text[textIndex].classList.add("text--correct");
    textIndex++;
  } else if (event.key !== "Backspace") {
    text[textIndex].classList.remove("text--current");
    text[textIndex].classList.add("text--wrong");
    textWrong = true;
    return;
  }
});
