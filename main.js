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
        game.createPlayers();
        display.playerSymbol(this, game.counter % 2 === 0 ? "O" : "X");
        game.engine($(this).attr("value"));
    });
}
function playerFactory(symbol,playerTurn){
    this.symbol = symbol;
    this.playerTurn = playerTurn;
    this.activePlayer = function(){
        this.playerTurn.addClass('currentPlayer');
    };
    this.nonActicePlayer = function(){
        this.playerturn.removeClass('currentPlayer');
    }
};

function gameConstructor() {
    this.winningPattern = [];
    this.players = [];
    this.counter = 1;
    this.engine = function (userPositionInput) {
    game.counter++;
    };

    this.createPlayers = function(){                          //will call on player factory
        var player1 =  new playerFactory('X',$('#player1'));
        var player2 = new playerFactory('O',$('#player2'));
        this.players.push(player1);
        this.players.push(player2);
        this.players[0].activePlayer();                      //this makes player one the active player as soon as it's created
    }
}

function displayConstructor() {
    this.playerSymbol = function (location,symbol) {
        console.log("working");
        $(location).text(symbol);
    }
}
