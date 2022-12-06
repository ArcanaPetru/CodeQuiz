var wrapper = document.querySelector(".wrapper");
var questions = wrapper.querySelector("#questions");
var feedbackDisplay = wrapper.querySelector("#feedback");
var endScreen = wrapper.querySelector("#end-screen");
var feedbackDuration = 1000;
var timer;

function feedback(message, end = false) {
    feedbackDisplay.textContent = message;
    feedbackDisplay.classList.remove("hide");

    // Remove feedback
    window.setTimeout(function(){
        feedbackDisplay.classList.add("hide");
        // No more questions - end the game after displaying feedback
        if (end) {
            endGame();
        }
    }, feedbackDuration);
}

function endGame(timeUp = false) {    
    var scoreDisplay = endScreen.querySelector("#final-score");

    // Stop timer
    clearInterval(timer);

    if(timeUp) {
        countdown.textContent = "0";    
    } 

    scoreDisplay.textContent = score;
    questions.classList.add("hide");
    feedbackDisplay.classList.add("hide");
    endScreen.classList.remove("hide");
}