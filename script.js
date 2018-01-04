$(document).ready(initializeApp);

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
    [
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1
    ];

function clickHandler() {
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
    runTokenDropAudio();
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

}


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
function checkForWin(){
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
                console.log("player " + playerPosition + " wins");
                winGame(playerPosition);
            }
            if(r-3 >= 0){
                if(playerPosition == board[r-1][c] && //checks above
                    playerPosition == board[r-2][c] &&
                    playerPosition == board[r-3][c]){
                    console.log("player " + playerPosition + "wins");
                    $('.victoryPageText').text("Player " + playerPosition + " Wins!");
                    winGame(playerPosition);
                }
                if(c+3< width &&
                    playerPosition == board[r-1][c+1] && //check up and right
                    playerPosition == board[r-2][c+2] &&
                    playerPosition == board[r-3][c+3]){
                    console.log("player " + playerPosition + "wins");
                    $('.victoryPageText').text("Player " + playerPosition + " Wins!");
                    winGame(playerPosition);
                }
                if(c-3 >=0 &&
                    playerPosition ==board[r-1][c-1]&&  //check up and left
                    playerPosition ==board[r-2][c-2]&&
                    playerPosition ==board[r-3][c-3]){
                    console.log("player " + playerPosition + "wins");
                    $('.victoryPageText').text("Player " + playerPosition + " Wins!");
                    winGame(playerPosition);
                }
            }
        }
    }
}

function winGame(playerPosition) {
    if(playerPosition === 1) {
        var winCounter = parseInt($('.leftNumber').text());
        winCounter++;
        $('.leftNumber').text(winCounter);
    } else if (playerPosition === 2) {
        var winCounter = parseInt($('.rightNumber').text());
        winCounter++;
        $('.rightNumber').text(winCounter);
    }
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
    }
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

}

function coinFly() {
    var topMeasure = 10000;
    if (tokenImages.length === 2) {  //to stop from spam clicking more coins
        return;
    } else {
        $(this).animate({bottom: topMeasure + '%'}, 3000);
        $('.selectionPageText').text('Player Two Pick').css('color', '#25f861');
        var tokenSource = $(this).attr('src');
        tokenImages.push(tokenSource);
        coinLaunchOff();
    }
    if (tokenImages.length === 2){
        setTimeout(addMainPage, 800);
        return;
    }

}

// Audio Javascript
var coinShakeAudio = new Audio("sounds/coinsound.wav");
var tokenDropAudio = new Audio("sounds/dropToken.wav");
var coinLaunchAudio = new Audio("sounds/coinLaunchOff.wav");
function runCoinShakeAudio() {
    coinShakeAudio.play();
}
function stopCoinShakeAudio(){
    coinShakeAudio.pause();
    coinShakeAudio.currentTime = 0;
}
function runTokenDropAudio(){
    tokenDropAudio.play();
}
function coinLaunchOff(){
    coinLaunchAudio.play();
}