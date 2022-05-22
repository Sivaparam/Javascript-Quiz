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





// Clears and prepares page to display questions 

function startTest() {
    document.getElementById("instr").style.display = "none";
    document.getElementById("quizbtn").style.display = "none";
    document.getElementById("answer").style.display = "none";
    document.getElementsByClassName("questionsection")[i].style.display = "block";

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

// Validates answers selected and displays result on screen
function validateAnswer() {
    console.log(event.target.id);
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
function displayScore() {

    document.getElementsByClassName("questionsection")[0].style.display = "none";
    document.getElementsByClassName("resultSection")[0].style.display = "inline";

    score = (correctAns / questions.length) * 100;
    document.getElementById("score").innerText = document.getElementById("score").innerText + score;

}

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



    }, 1000);
}

function captureScore() {
    console.log("capture");
    var savedScore;
    if (localStorage.getItem("savedScore") == undefined) {
        savedScore = [];
    } else {
        savedScore = JSON.parse(localStorage.getItem("savedScore"));
    }
    currentScore = document.getElementById("initials").value + "-" + score;
    savedScore.push(currentScore);
    localStorage.setItem("savedScore", JSON.stringify(savedScore));

    document.getElementById("clock").style.display = "none";
    document.getElementById("viewScore").style.display = "none";
    document.getElementsByClassName("resultSection")[0].style.display = "none";
    document.getElementsByClassName("displayHigh")[0].style.display = "inline";

    document.getElementById("saved-score").innerHTML = currentScore;

}

document.getElementById("viewScore").addEventListener("click", displayAllScores);

function displayAllScores() {
    event.preventDefault();
    document.getElementById("saved-score").innerHTML ="";
    document.getElementsByClassName("resultSection")[0].style.display = "none";
    document.getElementsByClassName("displayHigh")[0].style.display = "block";
    document.getElementById("instr").style.display = "none";
    document.getElementById("quizbtn").style.display = "none";
    document.getElementById("answer").style.display = "none";

    var allScore = [];
    allScore = JSON.parse(localStorage.getItem("savedScore"));
    for (i=0; i<allScore.length; i++) {
       var button = document.createElement("button");
       button.innerText = allScore[i];
           document.getElementById("saved-score").appendChild(button);
    }
}