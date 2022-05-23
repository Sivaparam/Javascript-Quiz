
// Global Variables 

// Quiz Question set objects 
var question1 = {
    quest: "Javascript is an __________ language?",
    opt1: "Object-Oriented",
    opt2: "Object-Based",
    opt3: "Procedural",
    opt4: "None of the above",
    ans: "opt1"
};

var question2 = {
    quest: "Which of the following methods is used to access HTML elements using Javascript?",
    opt1: "getElementbyId()",
    opt2: "getElementsByClassName()",
    opt3: "Both A and B",
    opt4: "None of the above",
    ans: "opt3"
};

var question3 = {
    quest: "Which of the following methods can be used to display data in some form using Javascript?",
    opt1: "document.write()",
    opt2: "console.log()",
    opt3: "window.alert()",
    opt4: "All of the above",
    ans: "opt4"
};

var question4 = {
    quest: "How to stop an interval timer in Javascript?",
    opt1: "clearInterval",
    opt2: "clearTimer",
    opt3: "intervalOver",
    opt4: "None of the above",
    ans: "opt1"
};

var question5 = {
    quest: "Which of the following variables takes precedence over the others if the names are the same?",
    opt1: "Global Variable",
    opt2: "Local Variable",
    opt3: "Undefined Varibale",
    opt4: "None of the above",
    ans: "opt2"
};

var questions = [question1, question2, question3, question4, question5];
var i = 0;
var correctAns = 0;
var score = 0;
var seconds = 120;
var timerInterval;
var timeEl = document.getElementById("clock").innerText;
var currentScore = [];


// Clears and prepares page to display questions 
function startTest() {
    document.getElementsByClassName("guide")[0].style.display = "none";
    document.getElementById("quizbtn").style.display = "none";
    document.getElementById("answer").style.display = "none";
    document.getElementById("viewScore").style.display = "none";
    document.getElementById("goBack").style.display = "none";
    document.getElementById("clock").style.display = "block";
    document.getElementsByClassName("questionSection")[i].style.display = "block";

    startClock();
    displayQuestion();
}

//Display questions, when answered - invokes function to validate and displays the next one 
function displayQuestion() {

    if (i === questions.length) {
        clearInterval(timerInterval);
        displayScore();
        return;
    }

    document.getElementById("answer").innerText = "";
    document.getElementById("quest").innerText = questions[i].quest;
    document.getElementById("opt1").innerText = questions[i].opt1;
    document.getElementById("opt2").innerText = questions[i].opt2;
    document.getElementById("opt3").innerText = questions[i].opt3;
    document.getElementById("opt4").innerText = questions[i].opt4;
}

// Validates any answer/option button is selected and displays result on screen
function validateAnswer() {

    document.getElementById("answer").style.display = "block";
    if (event.target.id === questions[i].ans) {
        correctAns = correctAns + 1;
        console.log(correctAns);
        document.getElementById("answer").innerText = "Correct";
    } else {
        document.getElementById("answer").innerText = "Incorrect"
        seconds = seconds - 10;
    }
    i = i + 1;
    setTimeout(displayQuestion, 1000);
}

// Displays final calcuated score 
//This function gets invoked set of questions are answered or when timer is zero
function displayScore() {

    document.getElementsByClassName("questionSection")[0].style.display = "none";
    document.getElementsByClassName("resultSection")[0].style.display = "block";
    score = (correctAns / questions.length) * 100;
    document.getElementById("score").innerText = document.getElementById("score").innerText + score;

}

// Timer function for quiz
//Is enabled when start quiz button is clicked
function startClock() {

    timerInterval = setInterval(function () {
        if (seconds <= 0) {
            document.getElementById("clock").innerText = timeEl + "0:00";
            clearInterval(timerInterval);
            displayScore();
            return;
        }
        seconds--;
        document.getElementById("clock").innerText = timeEl + Math.floor(seconds / 60) + ":" + (seconds % 60 >= 10 ? (seconds % 60) : "0" + (seconds % 60));
    }, 500);

}

//this function is enabled with Submit button is clicked (after the initials are entered)
//function displays the score for current test and also stores the details in local stoage
function captureScore() {

    var savedScore;
    if (localStorage.getItem("savedScore") == undefined) {
        savedScore = [];
    } else {
        savedScore = JSON.parse(localStorage.getItem("savedScore"));
    }

    currentScore = document.getElementById("initials").value + " has scored " + score;
    savedScore.push(currentScore);
    localStorage.setItem("savedScore", JSON.stringify(savedScore));

    document.getElementById("clock").style.display = "none";
    document.getElementById("viewScore").style.display = "none";
    document.getElementById("goBack").style.display = "inline";
    document.getElementById("clearScore").style.display = "none"
    document.getElementsByClassName("resultSection")[0].style.display = "none";
    document.getElementsByClassName("displaySavedScore")[0].style.display = "block";
    document.getElementById("allScore").style.display = "none";
    document.getElementById("saveScore").innerHTML = currentScore + "%";

}

//event listener for view highscore button
document.getElementById("viewScore").addEventListener("click", displayAllScores);

//function is enabled when view highscore button is clicked 
//this function prepares page to display all scores from local storage
function displayAllScores() {
    event.preventDefault();
    document.getElementById("saveScore").innerHTML = "";
    document.getElementsByClassName("displaySavedScore")[0].style.display = "block";
    document.getElementById("yourScore").style.display = "none";
    document.getElementsByClassName("guide")[0].style.display = "none";
    document.getElementById("viewScore").style.display = "none";
    document.getElementById("goBack").style.display = "inline";
    document.getElementById("quizbtn").style.display = "none";

    var allScore = [];
    allScore = JSON.parse(localStorage.getItem("savedScore"));

    for (i = 0; i < allScore.length; i++) {
        var label = document.createElement("label");
        label.innerText = (i + 1) + "." + " " + allScore[i] + "%";
        document.getElementById("saveScore").style.display = "block";
        document.getElementById("saveScore").appendChild(label);
    }
}

//Reloads page when goback button is clicked
function reload() {
    location.reload();
}

//event listener for goback button
document.getElementById("goBack").addEventListener("click", reload);

//fucntion to clear local storage when clear highscores button is clicked
function clearScore() {
    localStorage.clear();
    document.getElementById("saveScore").style.display = "none";
}