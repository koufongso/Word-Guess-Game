var wordGame = {
    /*---------------------------------- data ---------------------------------------------*/
    //word database, each associate a img and sound
    dataBase: {
        apple: "assets/images/apple.jpg",
        banana: "assets/images/banana.jpg",
        peach: "assets/images/peach.png",
        cat: "assets/images/cat.jpg",
        mouse: "assets/images/mouse.jpg",
        horse: "assets/images/horse.jpg"
    },

    /*---------------------------------- const variables ---------------------------------------------*/
    maxAttempt: 11,                 // defined maximum allowed guesses

    /*---------------------------------- variables -------------------------------------------*/
    winRecord: 0,                   // initial winRecord
    firstTime: true,                // game initial status when open the page
    remianAttempt: this.maxAttempt,
    index: -1,                      // store the correct word index 
    key: -2,                        // store the word 

    currentWord: [],                // remianing char 
    displayWord: [],                // "hidden" word that display on the currentWordSpan
    inputRecord: [],                // guessed word history

    // connect variables to html corresponding span elements
    winRecordSpan: document.getElementById("winRecordSpan"),
    currentWordSpan: document.getElementById("currentWordSpan"),
    remianAttemptSpan: document.getElementById("remainAttemptSpan"),
    inputRecordSpan: document.getElementById("inputRecordSpan"),
    displayImage: document.getElementById("displayImage"),

    /*---------------------------------- methods -------------------------------------------*/
    isFirstTime() {
        return this.firstTime;
    },

    // start a new game, initialize all variables
    newGame() {
        this.firstTime = false;
        console.log("newGame!")
        this.remianAttempt = this.maxAttempt;

        //not to generate the previous word
        do {
            var temp = Math.floor(Math.random() * (Object.keys(this.dataBase).length));
        } while (temp == this.index);
        this.index = temp;
        this.key = Object.keys(this.dataBase)[this.index];
        this.currentWord = this.key.split("");
        this.displayWord = this.key.split("");
        this.displayWord.fill("_");
        this.inputRecord = [];

        console.log("index:" + this.index);
        console.log("key:" + this.key);
        console.log("current:" + this.currentWord);
        console.log("display:" + this.displayWord);
    },

    check(input) {
        var i = this.currentWord.indexOf(input); //check coresponding char index

        if ((i != -1)) {
            //hit!
            this.currentWord[i] = "";        //replace the char by ""
            this.inputRecord.push(input);  //add it to the record
            this.displayWord[i] = input;   //reveal its position
            this.remianAttempt--;

            console.log("displayword:" + this.displayWord.join(""));
            if (this.displayWord.join("") == this.key) {
                //bingo!
                this.displayImage.src = this.dataBase[this.key];
                this.winRecord++;
                new Audio("assets/sounds/correct.wav").play(); //play correct sound effect
                this.newGame();
            }
        } else {
            //wrong!
            if (this.inputRecord.indexOf(input) == -1) {
                this.inputRecord.push(input);
                if ((--this.remianAttempt) == 0) {
                    //fail!
                    new Audio("assets/sounds/wrong.mp3").play();
                    this.newGame();
                }
            }
        }

        console.log("check! input:" + input);
        console.log("i:" + i);
        console.log("currentword:" + this.currentWord.toString(""));
        console.log("displayword:" + this.displayWord.toString(""));
        console.log("inputRecord:" + this.inputRecord);
    },

    updateScreen() {
        this.winRecordSpan.innerHTML = this.winRecord;
        this.currentWordSpan.innerHTML = this.displayWord.join("");
        this.remianAttemptSpan.innerHTML = this.remianAttempt;
        this.inputRecordSpan.innerHTML = this.inputRecord.toString();
    }
}


//every key press trigger the event
document.onkeypress = function (event) {
    if (wordGame.isFirstTime()) {
        wordGame.newGame();
    } else {
        wordGame.check(event.key.toLowerCase());
    }
    wordGame.updateScreen() //update the html file
};




