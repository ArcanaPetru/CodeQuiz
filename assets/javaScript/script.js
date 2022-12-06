var startBttn = document.querySelector("#start");
var startScreen = wrapper.querySelector("#start-screen");
var questionTitle = questions.querySelector("#question-title");
var choices = questions.querySelector("#choices");
var countdown = document.querySelector("#time");
var highScoreBttn = endScreen.querySelector("#submit");
var questionNum;
var currQuestion;
var score;
var correctfx = new Audio('./assets/sfx/correct.wav');
var incorrectfx = new Audio('./assets/sfx/incorrect.wav');
var tick = 1000;
var timeLeft;
var penalty = tick * 10;
var pointsPerQuestion = 10;

startBttn.addEventListener("click", onStart);
choices.addEventListener("click", onChoose);
highScoreBttn.addEventListener("click", onSave);

function onStart() {
    var timerDisplay = document.querySelector(".timer");
    timerDisplay.classList.remove("hide");
    questionNum = 0;
    score = 0;
    timeLeft = tick * 75;
    updateCountdown();
    timer = setInterval(onTick, tick);
    startScreen.classList.add("hide");
    questions.classList.remove("hide");
    loadQuestion();
}

function onTick() {
    timeLeft -= tick;

    // Check the time
    if (timeLeft <= 0) {
        return endGame(true);
    }
    updateCountdown();
}

function updateCountdown() {
    timerVal = timeLeft ? timeLeft/1000 : 0;
    countdown.textContent = timerVal;
}

function loadQuestion() {
    currQuestion = questionsArray[questionNum];
    
    // The current question will be updated when answer status is shown
    questionTitle.textContent = currQuestion.question;

    for (var i = 0; i < currQuestion.answers.length; i++) {
        choice = document.querySelector("[data-index='" + i + "']");
        choice.textContent = currQuestion.answers[i];
    }
}

function onChoose(e) {
    // Compare data-index of clicked choice to correctAnswer
    var choice = parseInt(e.target.dataset.index, 10);
    var correct = choice === currQuestion.correctAnswer;

    if (correct) {
        correctfx.play();
        score += pointsPerQuestion;
    } else {
        incorrectfx.play();
        // Reduce time remaining
        timeLeft = Math.max(0, timeLeft - penalty);
    }

    showAnswerStatus(correct);
}

function showAnswerStatus(correct) {
    // Operator to set message 
    var message = correct ? "Correct!" : "Wrong!";

    questionNum++;

    if (questionNum >= questionsArray.length) {
        choices.removeEventListener("click", onChoose);
        feedback(message, true);
    } else {
        // Show feedback and load next question
        feedback(message);
        loadQuestion();
    }
}

function onSave() {
    var initials = endScreen.querySelector("#initials").value;
    var highscoreData = window.localStorage.getItem("highscores");

    if (highscoreData === null) {
        highscoreData = {};
    }  else {
        highscoreData = JSON.parse(highscoreData);
    }
    
    // If previousBest is null, calling parseInt on it will return NaN
    var previousBest = parseInt(highscoreData[initials]);

    if (score < previousBest) {
        window.localStorage.setItem("feedback", "Good job!");
    } else if (score === previousBest) {
        // Score not updated as not better than personal best  
        window.localStorage.setItem("feedback", "You are doing better and better!");
    } else {
        //Update score
        highscoreData[initials] = score;
        // Update record in localStorage
        window.localStorage.setItem("highscores", JSON.stringify(highscoreData)); 
        window.localStorage.setItem("feedback", "Nice going " + initials + ", that was a personal best!");
    }  
    // Load highscores page
    window.location = "./highscores.html";  
}