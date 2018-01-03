$(document).ready(initializeApp);

function initializeApp() {
    $('#0').click(getId);
    $('#1').click(getId);
    $('#2').click(getId);
    $('#3').click(getId);
    $('#4').click(getId);
    $('#5').click(getId);
    $('#6').click(getId);
}


function getId() {
    var idOfColumn = $(this).attr('id');
    console.log(idOfColumn);
    return idOfColumn;
}