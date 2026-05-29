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

function getText() {
  return document.querySelectorAll(".text");
}

Array.from(TEXT).forEach((letter) => {
  createSpan().append(letter);
});

getText()[textIndex].classList.add("text--current");

document.addEventListener("keydown", (event) => {
  if (invalidKeys.includes(event.key)) {
    return;
  }

  console.log(event.key);

  if (textWrong) {
    if (event.key === "Backspace") {
      getText()[textIndex].classList.remove("text--wrong");
      getText()[textIndex].classList.add("text--current");
      textWrong = false;
      return;
    }
    return;
  }

  if (event.key === TEXT[textIndex]) {
    getText()[textIndex + 1].classList.add("text--current");
    getText()[textIndex].classList.remove("text--current");
    getText()[textIndex].classList.add("text--correct");

    textIndex++;
  } else if (event.key !== "Backspace") {
    getText()[textIndex].classList.remove("text--current");
    getText()[textIndex].classList.add("text--wrong");
    textWrong = true;
    return;
  }
});
