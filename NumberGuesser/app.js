let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;
console.log(winningNum);
const gameEle = document.getElementById('game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  } else {
    if (guess === winningNum) {
      // guessInput.disaled = true;
      // guessInput.style.borderColor = 'green';
      // setMessage(`${winningNum} is correct, you WIN!!!!`, 'green');
      gameOver(true, `${winningNum} is correct, you WIN!!!!`);
    } else {
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        gameOver(false, `Game Over!you lost.Correct number was ${winningNum}`);
      } else {
        guessInput.style.borderColor = 'red';
        setMessage(`${guess} is not correct,${guessesLeft} guess left`, 'red');
        guessInput.value = '';
      }
    }
  }
});

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function gameOver(won, msg) {
  let color = won === true ? 'green' : 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);
  guessBtn.value = 'Play Again';
  guessBtn.classList.add('play-again');
}

game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
