//for word guess game

//word database, each associate a img and sound
var words = ["apple", "banana", "peach", "cat", "mouse", "horse"];
var imgs=[]

var maxAttempt = 11;            // defined maximum allowed guesses

var winRecord = 0;              //
var firstTime = true;            // game initial status when open the page
var remianAttempt = maxAttempt;
var index;                      // current word index
var currentWord = "";           // current word
var displayWord = [];           // "hidden" word that display on the currentWordSpan
var inputRecord = " ";           // guessed word history

// connect variables to html corresponding span elements
var winRecordSpan = document.getElementById("winRecordSpan");
var currentWordSpan = document.getElementById("currentWordSpan");
var remianAttemptSpan = document.getElementById("remainAttemptSpan");
var inputRecordSpan = document.getElementById("inputRecordSpan");

/////////////////////////// game logic////////////////////////////////////////

//every key press trigger the event
document.onkeypress = function (event) {
    if (firstTime) {
        firstTime=false;
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
    currentWord = words[index];
    displayWord = currentWord.split("");
    displayWord.fill("_");
    inputRecord="";
    console.log("display:"+displayWord);
}

function check(input) {
    console.log("check! input:"+input);
    var i = currentWord.search(input);
    if ((i != -1)) {
        //bingo!
        currentWord=currentWord.replace(input,"\n") //replace the char with " "
        inputRecord+=input;
        displayWord[i]=input;

        if(!displayWord.includes("_")){
            winRecord++;
            newGame();
        }
    }else{
        //wrong!
        if(inputRecord.search(input)==-1){
            inputRecord+=input;
            if((--remianAttempt)==0){
                newGame();
            }
        }
    }
}

function updateScreen(){
    winRecordSpan.innerHTML=winRecord;
    currentWordSpan.innerHTML=displayWord.join("");
    remianAttemptSpan.innerHTML=remianAttempt;
    inputRecordSpan.innerHTML=inputRecord;
}




