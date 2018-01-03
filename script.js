


















var board= [
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
    for(r = board.length-1; r>=0; r-- ){
        if(board[r][colValue]===0){
            board[r][colValue]=player;
            playerToggle();
            return;
        }
    }

}
