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

// click handler functions

function getId() {
    var idOfColumn = $(this).attr('id');
    updateBoard(idOfColumn);
    checkForWin();
    console.log(board);
}


function coinCreation(col,bottom) {
    var token = $('<div>').addClass('token');
    $(token).css('bottom', bottom);
    var img = $('<img>').attr('src','images/trx.png');
    img.appendTo(token);
    token.appendTo(col);
}

function clickHandler() {
    var bottom = 0.1;
    var col = $(this);
    coinCreation(col,bottom);
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
            playerPosition == board[r][c+1] &&
            playerPosition == board[r][c+2] &&
            playerPosition == board[r][c+3]){  //checks to the right
                console.log("player " + playerPosition + "wins");
            }
            if(r-3 >= 0 &&
            playerPosition == board[r-1][c] &&
            playerPosition == board[r-2][c] &&
            playerPosition == board[r-3][c]){
                console.log("player " + playerPosition + "wins");
            }




        }
    }
}

