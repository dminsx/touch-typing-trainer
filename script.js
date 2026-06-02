const board = document.querySelector(".board");
const time = document.getElementById("timer");
const speed = document.getElementById("speed");
const mistakes = document.getElementById("mistakes");
const accuracy = document.getElementById("accuracy");

const TEXT =
  "В древности библиотеки представляли собой хранилища глиняных табличек и папирусных свитков, доступ к которым имели лишь избранные. Сегодня развитие цифровых технологий и интернета делает информацию доступной каждому человеку на планете всего в несколько кликов.";
const invalidKeys = ["Shift", "Meta", "Control", "Alt", "GroupNext", "Enter"];

let textIndex = 0;
let textWrong = false;
let isEnd = false;
let text = document.querySelectorAll(".text");
let start = document.getElementById("start");
let end = document.getElementById("end");
let mistakesCount = 0;
let timerId = null;
let msecValue = 0;
let correctLetters = 0;

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

function createSpan() {
  const span = document.createElement("span");
  span.classList.add("text");
  board.append(span);
  return span;
}

function initTrainer() {
  start.removeEventListener("click", initTrainer);

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

      start.textContent = "Закончить";
      start.id = "end";
      end = document.getElementById("end");
      end.addEventListener("click", confirmFinish);
      startTimer();
    }
  }, 1000);
}

function resetTrainer() {
  resetTimer();

  end.removeEventListener("click", confirmFinish);
  end.removeEventListener("click", resetTrainer);
  end.textContent = "Начать";
  end.id = "start";
  start = document.getElementById("start");
  start.addEventListener("click", initTrainer);

  board.textContent = 'Здесь будет текст. Жми "Начать"';
  board.classList.remove("board--text");
  board.classList.add("board--start");

  msecValue = 0;
  textIndex = 0;
  textWrong = false;
  isEnd = false;
  mistakesCount = 0;
  correctLetters = 0;
  speed.textContent = `0 зн/мин`;
  mistakes.textContent = mistakesCount;
  accuracy.textContent = `${getAccuracy()}%`;

  document.removeEventListener("keydown", handleKeydown);
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

start.addEventListener("click", initTrainer);
