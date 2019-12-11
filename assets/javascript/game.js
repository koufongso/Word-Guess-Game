/*---------------------------------- data ---------------------------------------------*/
//word database, each associate a img and sound
var dataBase = {
    "apple": "assets/images/apple.jpg",
    "banana": "assets/images/banana.jpg",
    "peach": "assets/images/peach.png",
    "cat": "assets/images/cat.jpg",
    "mouse": "assets/images/mouse.jpg",
    "horse": "assets/images/horse.jpg"
};

/*---------------------------------- setting ---------------------------------------------*/
var maxAttempt = 11;            // defined maximum allowed guesses

/*---------------------------------- variables -------------------------------------------*/
var winRecord = 0;              //
var firstTime = true;           // game initial status when open the page
var remianAttempt = maxAttempt;
var index=-1;                   // store the correct word index 
var key;                        // store the word 

var currentWord = [];           // remianing char 
var displayWord = [];           // "hidden" word that display on the currentWordSpan
var inputRecord = [];           // guessed word history

// connect variables to html corresponding span elements
var winRecordSpan = document.getElementById("winRecordSpan");
var currentWordSpan = document.getElementById("currentWordSpan");
var remianAttemptSpan = document.getElementById("remainAttemptSpan");
var inputRecordSpan = document.getElementById("inputRecordSpan");
var displayImage = document.getElementById("displayImage");

/*---------------------------------- logic -------------------------------------------*/

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

    //not to generate the previous word
    do{
        var temp = Math.floor(Math.random() * (Object.keys(dataBase).length));
    }while(temp==index);
    index = temp;
    console.log("index:"+index);
    
    key = Object.keys(dataBase)[index];
    console.log("key:"+key);

    currentWord = key.split("");
    displayWord = key.split("");
    displayWord.fill("_");
    inputRecord = [];
    console.log("current:" + currentWord);
    console.log("display:" + displayWord);
}

function check(input) {
    console.log("check! input:" + input);
    console.log("currentword:" + currentWord.toString(""));
    console.log("displayword:" + displayWord.toString(""));

    var i = currentWord.indexOf(input); //check coresponding char index
    console.log("i:" + i);
    if ((i != -1)) {
        //hit!
        currentWord[i]="";        //replace the char by ""
        inputRecord.push(input);  //add it to the record
        displayWord[i] = input;   //reveal its position
        remianAttempt--;

        console.log("displayword:" + displayWord.join(""));
        if (displayWord.join("") == key) {
            //bingo!
            displayImage.src=dataBase[key];
            winRecord++;
            new Audio("assets/sounds/correct.wav").play(); //play correct sound effect
            newGame();
        }
    } else {
        //wrong!
        if (inputRecord.indexOf(input) == -1) {
            inputRecord.push(input);
            if ((--remianAttempt) == 0) {
                //fail!
                new Audio("assets/sounds/wrong.mp3").play();
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




