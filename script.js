var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var finalScore = document.getElementById("finalScore");
var yourScore = document.getElementById("yourScore");
var addBtn = document.getElementById("add-btn");
var nameImput = document.getElementById("name");
var highScores = document.getElementById("highScores");
var nameAndScore = document.getElementById("nameAndScore");
var timerEl = document.getElementById("timer");
var highScoresBtn = document.getElementById("highScoresBtn");
var homeBtn = document.getElementById("homeBtn");
var finalQuestion = questions.length - 1;
var currentQuestion = 0;
var score = 0;
var user = [];
var timeLeft = 90;
var timeInterval = 0;


function showQuestion() {
  var q = questions[currentQuestion]; 
  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.textContent = q.choiceD;
}

function startQuiz() {
  // hide start button
  start.style.display = "none";
  // show questions
  showQuestion();
  //change display from none to visible
  quiz.style.display = "block";
  // timer starts
  startTimer();
}

function showScore() {
  // hide  quiz
  quiz.style.display = "none";
  finalScore.style.display = "block";
  // show score
  yourScore.textContent = score + timeLeft;
}

function storeScore(event) {
  user[user.length] = {
    names: nameImput.value,
    savedScores: score + timeLeft
  };

  localStorage.setItem("storage", JSON.stringify(user));
}

function renderScore() {
  nameAndScore.innerHTML = "";
  var lastUser = JSON.parse(localStorage.getItem("storage"));
  for (var i = 0; i < lastUser.length; i++) {
    var name = user[i].names;
    var score = user[i].savedScores;
    var div = document.createElement("div");
    div.textContent = name + "   " + score;
    div.setAttribute("data-index", i);
    nameAndScore.appendChild(div);
  }
  if ((lastUser = null)) {
    lastUser = user;
  }
}

function scoresPage() {
  start.style.display = "none";
  quiz.style.display = "none";
  finalScore.style.display = "none";
  highScores.style.display = "block";
  homeBtn.style.display = "block";
  clearInterval(timeInterval);
  // scores are added to high score list
  renderScore();
}

function homePage() {
  start.style.display = "block";
  quiz.style.display = "none";
  finalScore.style.display = "none";
  homeBtn.style.display = "none";
  highScores.style.display = "none";
}
function init() {
  start.style.display = "block";
  quiz.style.display = "none";
  finalScore.style.display = "none";
  homeBtn.style.display = "none";

  var lastUser = JSON.parse(localStorage.getItem("storage"));

  if (lastUser !== null) {
    user = lastUser;
  }
}

function startTimer() {
  timeInterval = setInterval(function() {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft <= 0) {
      timerEl.textContent = "";
      clearInterval(timeInterval);
    }
  }, 1000);
}

function checkAnswer(answer) {
  if (answer === questions[currentQuestion].correct) {
    score += 10;
  }
  if (answer !== questions[currentQuestion].correct) {
    // take 10 seconds off the time if incorrect
    timeLeft -= 10;
    score -= 10;
  }
  if (currentQuestion < finalQuestion) {
    currentQuestion++;
    showQuestion();
  } else {
    clearInterval(timeInterval);
    showScore();
  }
}

// the high scores are stored
start.addEventListener("click", startQuiz);
addBtn.addEventListener("click", storeScore);
highScoresBtn.addEventListener("click", scoresPage);
homeBtn.addEventListener("click", homePage);

init();