
// n = window.prompt("enter a name:");
// window.alert("hello" + n);
var questionCount = 0;
var numCorrect = 0;


let questions = ["what is the colour of the sky?", "how old are you?", "what is your name?"];

let answers1 = ["blue", "green", "red"];
let answers2 = ["12", "24", "23"];
let answers3 = ["bob", "jim", "morgan"];

let userAnswers = [];

var dict = {
    0: answers1,
    1: answers2,
    2: answers3
}

var correctAnswers = {
    0: answers1[0],
    1: answers2[1],
    2: answers3[2]
}

var alreadyAnswered = {
    0: false,
    1: false,
    2: false
}
var radioInputs = document.getElementsByName('answer');
var backBtn = document.getElementById("back-button");
var nextBtn = document.getElementById("next-button");
var submitBtn = document.getElementById("submit-button");
var score = document.getElementById("score");
var form = document.getElementById("form");
var scoreDisplay = document.getElementById("score-display")
var inputContainers = document.getElementsByClassName("answer-container");
var playAgainBtn = document.getElementById("play-again-button");
var errorMessage = document.getElementById('error-message');




playAgainBtn.addEventListener('click', function(){
    location.reload();
})

for (let i = 0 ; i < inputContainers.length; i++){
    inputContainers[i].addEventListener('click', function(){
        radioInputs[i].checked = true;
    })
}


function goNext(){
   
    // Iterate through the radio input elements
    var selected = false;
    for (var i = 0; i < radioInputs.length; i++) {
        if (radioInputs[i].checked) {
            // if (radioInputs[i].id == correctAnswers[questionCount]){
            //     numCorrect +=1;
            // }
            userAnswers[questionCount] = dict[questionCount][i];
            selected = true;
            break;
        }
    }
    if (selected) {
        console.log("score ", numCorrect);
        questionCount += 1;
        updatePage();
    } else {
        alert('Must select an answer to proceed to next question.');
    }
}

function goBack(){
    // console.log("clicked back");
    // if (radioInputs[questionCount].id == correctAnswers[questionCount] && questionCount != questions.length-1){
    //     numCorrect --;
    // }
    console.log("score: ",numCorrect);
    questionCount --;
    updatePage();
}


function updatePage(){
    // console.log("update called");
    // console.log(questionCount);
    if (questionCount == questions.length-1){
        nextBtn.disabled = true;
        // submitBtn.disabled = false;
    }
    else{
        nextBtn.disabled = false;
        // submitBtn.disabled = true;
    }
    if (questionCount == 0){
        backBtn.disabled = true;
    }
    else{
        backBtn.disabled = false;
    }
    let questionText = document.getElementById("question-text");
    let selections = document.getElementsByClassName("selection");

    for (let i = 0; i < dict[questionCount].length; i++){
        selections[i].innerHTML = dict[questionCount][i];
    }
    questionText.innerHTML = (questionCount+1 + ": " + questions[questionCount]);
}

function submit(){
    if(questionCount != questions.length-1){
        errorMessage.style.display = 'block';
        setTimeout(function () {
            errorMessage.style.transition = 'opacity 1s';
            errorMessage.style.opacity = '0';
        }, 1000);
        errorMessage.style.display = "none";
        return;
    }
    for (var i = 0; i < radioInputs.length; i++) {
        if (radioInputs[i].checked) {
            userAnswers[questionCount] = dict[questionCount][i];
            break;
        }
    }
    calculateScore();
    score.innerHTML = ("Score: " + numCorrect);
    DisplayCorrect();
    console.log(numCorrect);
}

function calculateScore(){
    for (let i = 0; i < questions.length; i++){
        if (userAnswers[i] == correctAnswers[i]){
            numCorrect ++;
        }
    }
    let toHide = document.getElementsByClassName("main-display");
    for (let i = 0; i < toHide.length; i++){
        toHide[i].style.display = "none";
    }
    form.style.display = "none";
}

function DisplayCorrect(){
    if (playAgainBtn.style.display == "none"){
        playAgainBtn.style.display = "block";
    }
    for (let i = 0; i < questions.length; i++){
        let newDiv = document.createElement('div');
        let newQ = document.createElement('p');
        let newA = document.createElement('p');
        let newUser = document.createElement('p');
        let container = document.getElementById("correct-container");

        newDiv.className = "correct-answers";
        newUser.className = "user-answers";

        newQ.innerHTML = ("Question " + (i+1) + ": " + questions[i]);
        newA.innerHTML = ("Correct Answer: " + correctAnswers[i]);
        newUser.innerHTML = ("Your answer: "+userAnswers[i]);
        if (userAnswers[i] != correctAnswers[i]){
            newUser.style.color = "red";
        }
        else {
            newUser.style.color = "green";
        }

        newDiv.appendChild(newQ);
        newDiv.appendChild(newA);
        newDiv.appendChild(newUser);
        container.appendChild(newDiv);
    }
}
