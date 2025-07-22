let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const compChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randonIdx = Math.floor(Math.random() * 3);
  return options[randonIdx];
};

const gameDraw = () => {
  msg.innerText = "Game Draw";
  msg.style.backgroundColor = "yellow";
  msg.style.color = "black";
};

const showWinner = (userWin, genCompChoice, userChoice) => {
  if (userWin) {
    msg.innerText = `You won the game! Your ${userChoice} beats ${genCompChoice}`;
    msg.style.backgroundColor = "green";
    userScore++;
    userScorePara.innerText = userScore;
  } else {
    msg.innerText = `You lost the game. ${genCompChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    compScore++;
    compScorePara.innerText = compScore;
  }
};

const playGame = (userChoice) => {
  const genCompChoice = compChoice();

  let userWin;

  if (userChoice === genCompChoice) {
    gameDraw();
  } else {
    if (userChoice === "rock") {
      userWin = genCompChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = genCompChoice === "scissors" ? false : true;
    } else {
      userWin = genCompChoice === "rock" ? false : true;
    }
    showWinner(userWin, genCompChoice, userChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
