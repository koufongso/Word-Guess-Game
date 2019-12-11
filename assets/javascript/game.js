//for word guess game

//word database, each associate a img and sound
var words = ["apple", "banana", "peach", "cat", "mouse", "horse"];
var imgDict = {
    "apple": "assets/images/apple.jpg",
    "banana": "assets/images/banana.jpg",
    "peach": "assets/images/peach.png",
    "cat": "assets/images/cat.jpg",
    "mouse": "assets/images/mouse.jpg",
    "horse": "assets/images/horse.jpg"
};

var maxAttempt = 11;            // defined maximum allowed guesses

var winRecord = 0;              //
var firstTime = true;           // game initial status when open the page
var remianAttempt = maxAttempt;
var index;                      // store the correct word index 
var currentWord = [];           // remianing char 
var displayWord = [];           // "hidden" word that display on the currentWordSpan
var inputRecord = [];          // guessed word history

// connect variables to html corresponding span elements
var winRecordSpan = document.getElementById("winRecordSpan");
var currentWordSpan = document.getElementById("currentWordSpan");
var remianAttemptSpan = document.getElementById("remainAttemptSpan");
var inputRecordSpan = document.getElementById("inputRecordSpan");
var displayImage = document.getElementById("displayImage");

/////////////////////////// game logic////////////////////////////////////////

//every key press trigger the event
document.onkeypress = function (event) {
    if (firstTime) {
        firstTime = false;
        newGame();
    } else {
        check(event.key.toLowerCase());
    }
    updateScreen() //update the html file
};


// start a new game, initialize all variables
function newGame() {
    console.log("newGame!")
    gameOver = false;
    remianAttempt = maxAttempt;
    index = Math.floor(Math.random() * words.length);
    currentWord = words[index].split("");
    displayWord = words[index].split("");
    displayWord.fill("_");
    inputRecord = [];
    console.log("current:" + currentWord);
    console.log("display:" + displayWord);
}

function check(input) {
    console.log("check! input:" + input);
    console.log("currentword:" + currentWord.toString(""));
    console.log("displayword:" + displayWord.toString(""));

    var i = currentWord.indexOf(input);
    console.log("i:" + i);
    if ((i != -1)) {
        //hit!
        currentWord[i]="";        //replace the char by ""
        inputRecord.push(input);     //add it to the record
        displayWord[i] = input;   //reveal its position

        console.log("displayword:" + displayWord.join(""));
        if (displayWord.join("") == words[index]) {
            //bingo!
            displayImage.src=imgDict[words[index]];
            winRecord++;
            newGame();
        }
    } else {
        //wrong!
        if (inputRecord.indexOf(input) == -1) {
            inputRecord.push(input);
            if ((--remianAttempt) == 0) {
                newGame();
            }
        }
    }

    console.log("inputRecord:" + inputRecord);
}

function updateScreen() {
    winRecordSpan.innerHTML = winRecord;
    currentWordSpan.innerHTML = displayWord.join("");
    remianAttemptSpan.innerHTML = remianAttempt;
    inputRecordSpan.innerHTML = inputRecord.toString();
}




