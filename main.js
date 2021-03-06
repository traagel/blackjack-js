let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true; //can I still play
let canStay = true;

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++){
        for (let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i<deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // while (dealerSum < 17){
    //     let cardImg = document.createElement("img");
    //     let card = deck.pop();
    //     cardImg.src = "./cards/" + card + ".png";
    //     dealerSum += getValue(card);
    //     dealerAceCount += checkAce(card);
    //     document.getElementById("dealer-cards").append(cardImg);
    // }
    playDealer();
    for (let i = 0; i < 2; i++){
        // let cardImg = document.createElement("img");
        // let card = deck.pop();
        // cardImg.src = "./cards/" + card + ".png";
        // yourSum += getValue(card);
        // yourAceCount += checkAce(card);
        // document.getElementById("your-cards").append(cardImg);

        playPlayer();
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("newGame").addEventListener("click", location.reload.bind(location));

}

function playDealer(){
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
}

function playPlayer(){
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
}

function hit(){
    if(!canHit){
        return;
    }
    // let cardImg = document.createElement("img");
    // let card = deck.pop();
    // cardImg.src = "./cards/" + card + ".png";
    // yourSum += getValue(card);
    // yourAceCount += checkAce(card);
    // document.getElementById("your-cards").append(cardImg);
    playPlayer();
    if(dealerSum<17){
        playDealer();
    }
    if (reduceAce(yourSum, yourAceCount) > 21){
        canHit = false;
        stay()
    }
}

function stay() {
    if(!canStay){
        return;
    }
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    while(dealerSum<17){
        playDealer();
        dealerSum = reduceAce(dealerSum, dealerAceCount);
    }
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21){
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    else if (yourSum === dealerSum)
    {
        message = "Tie!";
    }
    else if (yourSum > dealerSum){
        message = "You Win!";
    }
    else if (yourSum < dealerSum){
        message = "You Lose!";
    }

    document.getElementById("results").innerText = message;
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    canStay = false;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum> 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)){
        if (value === "A") {
            return 11;
        }
        return 10;
    }

    return parseInt(value);
}

function checkAce(card) {
    if (card[0] ==="A"){
        return 1;
    }
    return 0;
}