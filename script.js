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
    console.log(idOfColumn);
    return idOfColumn;
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

