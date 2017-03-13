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
    $('#player1').addClass('current_player');
});
function click_handler() {
    console.log("Click Handler Works");
    $("#grid_board").on('click' , 'div' , function(){
        game.createPlayers();
        display.playerSymbol(this, game.counter % 2 === 0 ? "O" : "X");
        game.engine($(this).attr("value"));
        game.playerSwitch(); // Switches player on click, could move later to something else.
        game.playerLock();
    });
}
function playerFactory(symbol,playerTurn){
    this.symbol = symbol;
    this.playerTurn = playerTurn;
    this.symbol = function(){                                 //returns the symbol for the particular player created
        return this.symbol;
    };
    this.activePlayer = function(){
        this.playerTurn.addClass('current_player');
    };
    this.nonActivePlayer = function(){
        this.playerTurn.removeClass('current_player');
    };
}
function gameConstructor() {
    console.log("Game constructor works!");
    this.winningPattern = [
        [0,1,2],
        [0,4,8],
        [0,3,6],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [3,4,5],
        [6,7,8]
    ];
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
    };
    this.playerSwitch = function () { // Switches player from Player 1 to Player 2 and also displays whose turn it is.
        if(this.current_player) {
            this.current_player = 0;
            this.players[0].activePlayer();
            this.players[1].nonActivePlayer();
            console.log("Current player is: " + this.current_player)
        }
        else {
            this.current_player = 1;
            this.players[1].activePlayer();
            this.players[0].nonActivePlayer();
            console.log("Current player is: " + this.current_player)
        }
    };
    this.playerLock = function () { // Deactivates the non-current player, prevents other player from clicking on things
        if(this.current_player) {

        }
        else {

        }
    }
}
function displayConstructor() {
    this.playerSymbol = function (location,symbol) {
        console.log("working");
        $(location).text(symbol);
    }
}
