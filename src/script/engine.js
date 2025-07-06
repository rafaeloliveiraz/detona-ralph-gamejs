const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#timeLeft"),
    score: document.querySelector("#score"),
    panel: document.querySelector(".panel"),
    resultScore: document.querySelector("#scoreResult"),
    life: document.querySelector("#life"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
    life: 5,
  },
  action: {
    timeId: setInterval(randomSquare, 500), //Ajustar a velocidade
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.action.timeId);
    clearInterval(state.action.countDownTimerId);
    playSound("stage_clear");
    // alert("Fim de jogo! Sua pontuação foi " + state.values.result);
    state.view.resultScore.textContent = state.values.result;
    state.view.panel.classList.add("hide");
    state.view.resultPanel.classList.remove("hide");
  }
}

function playSound(soundName) {
  let audio = new Audio(`./src/sound/${soundName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function init() {
  addListerHitBox();
}

init();
