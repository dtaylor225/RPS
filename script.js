const num = document.getElementsByName("options")[0];
const opt = document.getElementsByName("options")[1];
const player = document.querySelector(".player-h");
const opp = document.querySelector(".player-a");
let scoreH = document.querySelector(".score-h");
let scoreA = document.querySelector(".score-a");
const roundsBtn = document.querySelector(".btn-rounds");
const choiceBtn = document.querySelector(".btn-choice");
const resetBtn = document.querySelector(".btn-reset");
let track = document.getElementById("track");
let sel = document.querySelector(".sel");
let progress = document.querySelector(".progress");

const choices = ["Rock", "Paper", "Scissors"];

// Make move selection and score display hidden at the start
player.classList.add("hidden");
opp.classList.add("hidden");

let fin; // Represents goal score

// Deciding goal score
roundsBtn.addEventListener("click", function () {
  fin = +num.value;
  track.innerText = `Winner of best ${fin} of ${fin * 2 - 1} wins!`;
  player.classList.remove("hidden");
  opp.classList.remove("hidden");
  sel.classList.add("hidden");
});

// Player and AI each make a move
choiceBtn.addEventListener("click", function () {
  // Guard clause incase human picks none
  if (opt.value === "None Selected") return;

  // AI picks random
  const ai = choices[Math.trunc(Math.random() * 3)];
  let winner;

  // Same choice made
  if (opt.value === ai) {
    progress.innerText = "DRAW!";
    return;
  }
  // One picked rock, the other picked scissors
  else if (Math.abs(choices.indexOf(opt.value) - choices.indexOf(ai)) === 2) {
    winner = opt.value === "Rock" ? "Human" : "AI";
  }
  // The 2 elements are 1 apart from one another in the choices array
  else {
    winner = choices.indexOf(opt.value) > choices.indexOf(ai) ? "Human" : "AI";
  }

  // Check who round winner is if not a draw
  if (winner === "Human") {
    progress.innerText = `Human wins round with ${opt.value} over ${ai}`;
    let score = Number(scoreH.textContent.slice(7));
    score++;
    scoreH.textContent = `Score: ${score}`;
  } else {
    progress.innerText = `AI wins round with ${ai} over ${opt.value}`;
    let score = Number(scoreA.textContent.slice(7));
    score++;
    scoreA.textContent = `Score: ${score}`;
  }

  // Check if there is a winner
  const hScore = +scoreH.textContent.slice(7);
  const aScore = +scoreA.textContent.slice(7);
  if ((hScore === fin) ^ (aScore === fin)) {
    track.innerText = `${hScore > aScore ? "Human" : "AI"} wins ${Math.max(
      hScore,
      aScore
    )} - ${Math.min(hScore, aScore)}`;
    player.classList.add("hidden");
    opp.classList.add("hidden");
  }
});

// Reset everything if the reset button is clicked
resetBtn.addEventListener("click", function () {
  player.classList.add("hidden");
  opp.classList.add("hidden");
  sel.classList.remove("hidden");
  track.innerText = "Select number of rounds";
  scoreH.textContent = "Score: 0";
  scoreA.textContent = "Score: 0";
  progress.innerText = "";
  opt.value = "None Selected";
});
