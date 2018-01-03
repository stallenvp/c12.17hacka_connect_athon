$(document).ready(initializeApp);

function initializeApp() {
    $('.col').click(getId);
}


function getId() {
    var idOfColumn = $(this).attr('id');
    updateBoard(idOfColumn);
    console.log(board);
    checkForWin();
}

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

