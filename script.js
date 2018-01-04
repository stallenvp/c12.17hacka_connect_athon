$(document).ready(initializeApp);


// click handlers and functions that need to run on load

function initializeApp() {
    $('#0').click(clickHandler);
    $('#1').click(clickHandler);
    $('#2').click(clickHandler);
    $('#3').click(clickHandler);
    $('#4').click(clickHandler);
    $('#5').click(clickHandler);
    $('#6').click(clickHandler);
    selectionPageCoinCreation();
    //create fly animation for selection page coins
    $('.selectionPageCoin').click(coinFly);
    //create sound animation on mouseover over selection page coins
    $('.selectionPageCoin').on('mouseover',runCoinShakeAudio);
    $('.selectionPageCoin').on('mouseleave',stopCoinShakeAudio);
    //create sound animation onclick to drop each token

    //clickhandlers for titlePage
    $(".playButton").click(removeTitlePage);
    $(".playAgainButton").click(playGameAgain);
<<<<<<< HEAD
    $(".playAgainButtonDraw").click(playGameAgain);
=======

    //mute sound click handler
    $('.muteButton').click(muteSound);
>>>>>>> 7ec6af8314f9ad279f9ae581c58d01f40842465f
}



// click handler functions
var tokenImages = [];


//create coins
function coinCreation(col) {
    var token = $('<div>').addClass('token');
    var img = $('<img>').attr('src',tokenImages[player-1]);
    img.appendTo(token);
    token.appendTo(col);
    return token;
}
//array to track each column's bottom position to update for when coin drops in

var bottomPositions =
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];

function clickHandler() {
    if(playerHasWon){
        return;
    }
    var idOfColumn = $(this).attr('id');
    if(board[0][idOfColumn]!==0){           //stop from creating more coins if full
        return;
    }
    updateBoard(idOfColumn);
    var currentStart = bottomPositions[idOfColumn];
    console.log(board);
    var col = $(this);
    var token = coinCreation(col);
    $(token).animate({bottom: currentStart+'%'}, 1000);
    bottomPositions[idOfColumn] += 16.8;
    // runTokenDropAudio();
    setTimeout(runTokenDropAudio, 780);
    $('.col').toggleClass("playerTwo");

    checkForWin();
    checkForDraw();
}

//function to reset game

function resetGame(){
    $(".token").remove();
    bottomPositions =
        [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1
        ];
    board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    player = 1;
    $('.col').removeClass("playerTwo");
    $(".coinBox").empty();
    selectionPageCoinCreation();
    tokenImages=[];
    //reset clickhandlers and create coins again
    $('.selectionPageCoin').click(coinFly);
    $('.selectionPageText').text("Player One Pick").css("color", "#ff42be");
    $('.tokenPerPlayer').remove();
    $('.selectionPageCoin').on('mouseover',runCoinShakeAudio);
    $('.selectionPageCoin').on('mouseleave',stopCoinShakeAudio);

    playerHasWon = false;

}

// array to hold src for each image when chosen from selection page

var tokenImages = [];

// game board logic functions

var board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

var player = 1;

function playerToggle(){
    if(player===1){
        player =2;
    }
    else if(player === 2){
        player = 1;
    }
}

function updateBoard(colValue){
    for(var r = board.length-1; r>=0; r-- ){
        if(board[r][colValue]===0){
            board[r][colValue]=player;
            playerToggle();
            return;
        }
    }
}

//function main check for win function that will look in all directions
var playerHasWon = false;

function checkForWin(){
    if(playerHasWon){
        return;
    }

    var height = board.length; //6
    var width = board[0].length;  //7
    for(var r=height-1; r>=0; r--){ //iterate rows bottom to top;
        for(var c=0; c<width-1;c++){ //iterate columns right to left;
            var playerPosition = board[r][c];
            if(playerPosition===0){
                continue;
            }
            if(c+3 < width &&
            playerPosition == board[r][c+1] &&  //checks to the right
            playerPosition == board[r][c+2] &&
            playerPosition == board[r][c+3]){
                playerHasWon = true;
                winGame(playerPosition);
            }
            if(r-3 >= 0){
                if(playerPosition == board[r-1][c] && //checks above
                    playerPosition == board[r-2][c] &&
                    playerPosition == board[r-3][c]){
                    playerHasWon = true;
                    winGame(playerPosition);
                }
                if(c+3< width &&
                    playerPosition == board[r-1][c+1] && //check up and right
                    playerPosition == board[r-2][c+2] &&
                    playerPosition == board[r-3][c+3]){
                    playerHasWon = true;
                    winGame(playerPosition);
                }
                if(c-3 >=0 &&
                    playerPosition ==board[r-1][c-1]&&  //check up and left
                    playerPosition ==board[r-2][c-2]&&
                    playerPosition ==board[r-3][c-3]){
                    playerHasWon = true;
                    winGame(playerPosition);
                }
            }
        }
    }
}
// function that increments the counter for each player per win

function winGame(playerPosition) {

    victoryMusic();
    if(playerPosition === 1) {
        var winCounter = parseInt($('.leftNumber').text());
        winCounter++;
        $('.leftNumber').text(winCounter);
        $('.victoryPageText').text("Player " + playerPosition + " Wins!").css("color", "#ff42be");
    } else if (playerPosition === 2) {
        var winCounter = parseInt($('.rightNumber').text());
        winCounter++;
        $('.rightNumber').text(winCounter);
        $('.victoryPageText').text("Player " + playerPosition + " Wins!").css("color", "#25f861");
    }
    setTimeout(function(){
        $('.container').removeClass("visible");
        $('.container').addClass("hidden");
    }, 800)
    setTimeout(function() {             //triggers winPage
        $('.victoryPage').addClass("visible")},900);
}

//checks to see if the game is a draw

function checkForDraw(){
    var counter = 0;
    for(var c = 0; c<board[0].length; c++){
        if(board[0][c]!== 0){
            counter +=1;
        }
    }
    if(counter ===7){
        console.log("the game is a tie");
        counter = 0;
        setTimeout(function(){
            $('.container').removeClass("visible");
            $('.container').addClass("hidden");
        }, 800);
        setTimeout(function() {             //triggers winPage
            $('.drawPage').addClass("visible")},900);

    }

}

//to trigger when one player wins the game or draws
function playGameAgain(){
    $(".victoryPage").removeClass("visible");
    $(".drawPage").removeClass("visible");
    $(".container").removeClass("hidden");
    $(".selectionPage").removeClass("hidden");
    $(".selectionPage").addClass("visible");
    resetGame();

}


// Dom creation of coin elements on selection page

var selectionPageTokens =
    [
        {
            'src': 'images/bitcoin.png',
            'class': 'selectionPageCoin',
            'id': 'bitcoin'
        },
        {
            'src': 'images/corecoin.png',
            'class': 'selectionPageCoin',
            'id': 'corecoin'
        },
        {
            'src': 'images/ripple.png',
            'class': 'selectionPageCoin',
            'id': 'ripple'
        },
        {
            'src': 'images/trx.png',
            'class': 'selectionPageCoin',
            'id': 'tron'
        },
        {
            'src': 'images/etherium.png',
            'class': 'selectionPageCoin',
            'id': 'etherium'
        }
    ];

function selectionPageCoinCreation() {
    for(var i = 0; i < selectionPageTokens.length; i++) {
        var coinImg = $('<img>').addClass(selectionPageTokens[i].class).attr('src', selectionPageTokens[i].src).attr('id', selectionPageTokens[i].id);
        $('.coinBox').append(coinImg);
    }
}


//clickhandler functions for screen transitions

function removeTitlePage(){
    $('.startPage').addClass("hidden");
    $(".selectionPage").addClass("visible");
}
function addMainPage(){
    $(".selectionPage").addClass("hidden");
    $(".selectionPage").removeClass("visible");
    $(".container").addClass("visible");
    playerOneCoinDrop();
    playerTwoCoinDrop();
}

// function to take coin off page once it is selected by a player

function coinFly() {
    var topMeasure = 10000;
    if (tokenImages.length === 2) {  //to stop from spam clicking more coins
        return;
    } else {
        $(this).animate({bottom: topMeasure + '%'}, 3000);
        $('.selectionPageText').text('Player Two Pick').css('color', '#25f861');
        var tokenSource = $(this).attr('src');
        tokenImages.unshift(tokenSource);
        coinLaunchOff();
    }
    if (tokenImages.length === 2){
        setTimeout(addMainPage, 800);
        return;
    }
}

// Functions that create coin when coin falls onto main game screen

function playerOneCoinDrop() {
    var playerOneToken = $('<div>').addClass('tokenPerPlayer');
    var playerOneCoinImg = $('<img>').attr('src',tokenImages[1]);
    playerOneCoinImg.appendTo(playerOneToken);
    playerOneToken.appendTo($('.leftArea'));
    $(playerOneToken).animate({bottom: 45+'%'}, 1500);
}
function playerTwoCoinDrop() {
    var playerTwoToken = $('<div>').addClass('tokenPerPlayer');
    var playerTwoCoinImg = $('<img>').attr('src',tokenImages[0]);
    playerTwoCoinImg.appendTo(playerTwoToken);
    playerTwoToken.appendTo($('.rightArea'));
    $(playerTwoToken).animate({bottom: 45+'%'}, 1900);
}

// Audio Javascript
var coinShakeAudio = new Audio("sounds/coinsound1.wav");
var tokenDropAudio = new Audio("sounds/dropToken1.wav");
var coinLaunchAudio = new Audio("sounds/coinLaunchOff.wav");
var victoryMusicAudio = new Audio("sounds/victoryMusic.mp3");
function runCoinShakeAudio() {
    coinShakeAudio.play();
}
function stopCoinShakeAudio(){
    coinShakeAudio.pause();
    coinShakeAudio.currentTime = 0;
    coinShakeAudio.loop = true;
}
function muteSound(){
    if(coinShakeAudio.volume === 0){
        coinShakeAudio.volume = .5;
        coinLaunchAudio.volume = .5;
        tokenDropAudio.volume = .5;
        victoryMusicAudio.volume = .5;
    }
    else{
        coinShakeAudio.volume = 0;
        coinLaunchAudio.volume = 0;
        tokenDropAudio.volume = 0;
        victoryMusicAudio.volume = 0;
    }
}
function runTokenDropAudio(){
    tokenDropAudio.pause();
    tokenDropAudio.currentTime = 0;
    tokenDropAudio.play();
}
function coinLaunchOff(){
    coinLaunchAudio.pause();
    coinLaunchAudio.currentTime = 0;
    coinLaunchAudio.play();
}
function victoryMusic(){
    victoryMusicAudio.play();
}