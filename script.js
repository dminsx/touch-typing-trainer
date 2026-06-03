const board = document.querySelector(".board");
const time = document.getElementById("timer");
const speed = document.getElementById("speed");
const mistakes = document.getElementById("mistakes");
const accuracy = document.getElementById("accuracy");
const mainButton = document.getElementById("main-button");

const TEXT =
  "В древности библиотеки представляли собой хранилища глиняных табличек и папирусных свитков, доступ к которым имели лишь избранные. Сегодня развитие цифровых технологий и интернета делает информацию доступной каждому человеку на планете всего в несколько кликов.";
const invalidKeys = ["Shift", "Meta", "Control", "Alt", "GroupNext", "Enter"];

let text;
let textIndex = 0;
let mistakesCount = 0;
let correctLetters = 0;
let msecValue = 0;
let isStarted = false;
let textWrong = false;
let isEnd = false;
let timerId = null;

function timer() {
  msecValue += 100;

  let m = Math.floor(msecValue / 60000) % 60;
  let s = Math.floor(msecValue / 1000) % 60;
  let ms = msecValue / 100;

  time.textContent = `${m}:${String(s).padStart(2, 0)}.${String(ms).slice(-1)}`;
}

function startTimer() {
  timerId = setInterval(timer, 100);
}

function endTimer() {
  clearInterval(timerId);
}

function resetTimer() {
  timerId = null;
  msecValue = 0;
  time.textContent = `0:00.0`;
}

function getTime() {
  return time.textContent;
}

function getAccuracy() {
  return (100 - (mistakesCount / TEXT.length) * 100).toFixed(2);
}

function getSpeed() {
  return (correctLetters / (msecValue / 60000)).toFixed(0);
}

function getResult() {
  alert(`ВАШ РЕЗУЛЬТАТ
                Время: ${time.textContent}
                Скорость: ${speed.textContent}
                Обшибки: ${mistakes.textContent}
                Точность: ${accuracy.textContent}`);
}

function createSpan() {
  const span = document.createElement("span");
  span.classList.add("text");
  board.append(span);
  return span;
}

function initTrainer() {
  mainButton.disabled = true;
  mainButton.textContent = "Закончить";
  let startTime = 3;
  board.textContent = startTime;
  let timeToStart = setInterval(() => {
    startTime--;
    board.textContent = startTime;

    if (startTime === 0) {
      board.textContent = "Погнали!";
    } else if (startTime < 0) {
      clearInterval(timeToStart);
      board.textContent = "";
      board.classList.remove("board--start");
      board.classList.add("board--text");

      Array.from(TEXT).forEach((letter) => {
        createSpan().append(letter);
      });

      text = document.querySelectorAll(".text");
      text[textIndex].classList.add("text--current");
      document.addEventListener("keydown", handleKeydown);

      startTimer();
      mainButton.disabled = false;
    }
  }, 1000);
}

function resetTrainer() {
  mainButton.textContent = "Начать";

  board.textContent = 'Здесь будет текст. Жми "Начать"';
  board.classList.remove("board--text");
  board.classList.add("board--start");

  textIndex = 0;
  mistakesCount = 0;
  correctLetters = 0;
  isStarted = false;
  textWrong = false;
  isEnd = false;
  resetTimer();

  speed.textContent = `0 зн/мин`;
  mistakes.textContent = mistakesCount;
  accuracy.textContent = `${getAccuracy()}%`;

  document.removeEventListener("keydown", handleKeydown);
}

function confirmFinish() {
  let finish = confirm("Уверены, что хотите закончить?");
  endTimer();
  if (finish) {
    getResult();
    resetTrainer();
  } else {
    startTimer();
  }
}

function handleKeydown(event) {
  event.preventDefault();

  if (invalidKeys.includes(event.key) || isEnd) {
    return;
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
    if (textIndex < TEXT.length - 1) {
      text[textIndex + 1].classList.add("text--current");
      text[textIndex].classList.remove("text--current");
      text[textIndex].classList.add("text--correct");
      textIndex++;
      correctLetters++;
      speed.textContent = `${getSpeed()} зн/мин`;
    } else {
      text[textIndex].classList.remove("text--current");
      text[textIndex].classList.add("text--correct");
      correctLetters++;
      speed.textContent = `${getSpeed()} зн/мин`;
      isEnd = true;
      endTimer();
      setTimeout(() => {
        getResult();
        resetTrainer();
      }, 333);
    }
  } else if (event.key !== "Backspace") {
    text[textIndex].classList.remove("text--current");
    text[textIndex].classList.add("text--wrong");
    textWrong = true;
    mistakesCount++;
    mistakes.textContent = mistakesCount;
    accuracy.textContent = `${getAccuracy()}%`;
  }
}

function handleClickMainButton() {
  if (isStarted) {
    confirmFinish();
  } else {
    initTrainer();
    isStarted = true;
  }
}

mainButton.addEventListener("click", handleClickMainButton);
