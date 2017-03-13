/**
 * Created by kngwin9 on 3/13/17.
 */

// Firebase Config
var config = {
    apiKey: "AIzaSyBnHoatRyvoF6KJAgF2rI95MpCemMdO_CY",
    authDomain: "tictactoe-b9ace.firebaseapp.com",
    databaseURL: "https://tictactoe-b9ace.firebaseio.com",
    storageBucket: "tictactoe-b9ace.appspot.com",
    messagingSenderId: "51570292060"
};
firebase.initializeApp(config);


var game = new gameConstructor();
var display = new displayConstructor();

$(document).ready(function () {
    click_handler();
});


function click_handler() {
    $("#grid_board").on('click' , 'div' , function(){
        display.playerPiece(this, game.count % 2 === 0 ? game.playerTwo : game.playerOne);
        game.engine($(this).attr("value"));
    });
}

function gameConstructor() {
    this.turn =
    this.count = 1;
    this.winningPattern = [];
    this.board = [];
    this.playerOne = "X";
    this.playerTwo = "O";
    this.engine = function (userPositionInput) {
        this.board[userPositionInput] = game.gameCount % 2 === 0 ? game.playerTwo : game.playerOne;
        this.count++;
    }
}


function displayConstructor() {
    this.playerPiece = function (displayAddress, gameIcon) {
        console.log("working");
        $(displayAddress).text(gameIcon);
    }
}