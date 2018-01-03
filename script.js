$(document).ready(initializeApp);

function initializeApp() {
    $('#0').click(clickHandler);
    $('#1').click(clickHandler);
    $('#2').click(clickHandler);
    $('#3').click(clickHandler);
    $('#4').click(clickHandler);
    $('#5').click(clickHandler);
    $('#6').click(clickHandler);
}
var tokenImages = ['images/trx.png','images/corecoin.png']
// click handler functions

function coinCreation(col) {
    var token = $('<div>').addClass('token');
    var img = $('<img>').attr('src',tokenImages[player-1]);
    img.appendTo(token);
    token.appendTo(col);
    return token;
}
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
    updateBoard(idOfColumn);
    var currentStart = bottomPositions[idOfColumn];
    console.log(board);
    var col = $(this);
    var token = coinCreation(col);
    $(token).animate({bottom: currentStart+'%'}, 1000);
    bottomPositions[idOfColumn] += 16.8;
    checkForWin();
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
                console.log("player " + playerPosition + "wins");
            }
            if(r-3 >= 0){
                if(playerPosition == board[r-1][c] && //checks above
                    playerPosition == board[r-2][c] &&
                    playerPosition == board[r-3][c]){
                    console.log("player " + playerPosition + "wins");
                }
                if(c+3< width &&
                    playerPosition == board[r-1][c+1] && //check up and right
                    playerPosition == board[r-2][c+2] &&
                    playerPosition == board[r-3][c+3]){
                    console.log("player " + playerPosition + "wins");
                }
                if(c-3 >=0 &&
                    playerPosition ==board[r-1][c-1]&&  //check up and left
                    playerPosition ==board[r-2][c-2]&&
                    playerPosition ==board[r-3][c-3]){
                    console.log("player " + playerPosition + "wins");
                }

            }

        }
    }
}

