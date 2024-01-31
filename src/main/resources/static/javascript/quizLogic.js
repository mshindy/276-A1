
// n = window.prompt("enter a name:");
// window.alert("hello" + n);
var questionCount = 0;
var numCorrect = 0;


let questions = ["In what year did the Berlin Wall fall?", "What is the capital city of Brazil?", "Who wrote “Pride and Prejudice”?", 
"Which mountain range is the longest in the world?", "What is the largest bone in the human body?", "In which year did World War II end?"];

let answers1 = ["1989", "1978", "1990"];
let answers2 = ["São Paulo", " Brasília", "Rio de Janeiro"];
let answers3 = ["George Orwell", "Virginia Woolf", "Jane Austen"];
let answers4 = ["The Alps", "The Rocky Mountains", "The Andes"];
let answers5 = ["Femur", "Tibia", "Humerus"];
let answers6 = ["1940", "1943", "1945"];

let userAnswers = [];

var dict = {
    0: answers1,
    1: answers2,
    2: answers3,
    3: answers4,
    4: answers5,
    5: answers6
}

var correctAnswers = {
    0: answers1[0],
    1: answers2[1],
    2: answers3[2],
    3: answers4[2],
    4: answers5[0],
    5: answers6[2]
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




playAgainBtn.addEventListener('click', function(){
    location.reload();
})

for (let i = 0 ; i < inputContainers.length; i++){
    inputContainers[i].addEventListener('click', function(){
        radioInputs[i].checked = true;
    })
}


function goNext(){
   
    var selected = false;
    for (var i = 0; i < radioInputs.length; i++) {
        if (radioInputs[i].checked) {
            userAnswers[questionCount] = dict[questionCount][i];
            selected = true;
            break;
        }
    }
    if (selected) {
        questionCount += 1;
        updatePage();
    } else {
        alert('Must select an answer to proceed to next question.');
    }
}

function goBack(){
    questionCount --;
    updatePage();
}


function updatePage(){
    if (questionCount == questions.length-1){
        nextBtn.disabled = true;
        submitBtn.disabled = false;
        submitBtn.classList = 'main-display submit-button'
    }
    else{
        nextBtn.disabled = false;
        submitBtn.disabled = true;
        submitBtn.classList = 'main-display disabled-button';
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
    for (var i = 0; i < radioInputs.length; i++) {
        if (radioInputs[i].checked) {
            userAnswers[questionCount] = dict[questionCount][i];
            break;
        }
    }
    calculateScore();
    score.innerHTML = ("Score: " + numCorrect);
    DisplayCorrect();
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
        newQ.style = "font-weight: 300px;";
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
