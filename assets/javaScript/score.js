var wrapper = document.querySelector(".wrapper");
var highscores = wrapper.querySelector("#highscores");
var clearBttn = wrapper.querySelector("#clear");
var feedbackDisplay = document.querySelector("#feedback");
var scoreMessage = window.localStorage.getItem("feedback");
window.localStorage.removeItem("feedback");

clearBttn.addEventListener("click", onClear);

if (scoreMessage) {
    // Feedback message
    feedback(scoreMessage);
}

var highscoreData = window.localStorage.getItem("highscores");

if (highscoreData) {
    highscoreData = JSON.parse(highscoreData);

    // Add score data to highscores list
    for (var [key, value] of Object.entries(highscoreData)) {
        var entry = document.createElement("li");
        entry.textContent = key + ": " + value;
        highscores.appendChild(entry);
    }
} else {
    feedback("No highscores to show.");
}

function onClear() {
    window.localStorage.removeItem("highscores");
    highscores.innerHTML = "";
    feedback("Highscores cleared.");
}