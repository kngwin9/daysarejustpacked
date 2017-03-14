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
var player = new playerConstructor();


$(document).ready(function () {
    player.create();
    click_handler();

});
function click_handler() {
    $("#grid_board").on('click' , 'div' , function(){
        game.engine(this);
    });
}

function gameConstructor() {
    this.board = [];
    this.winCombination = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    this.engine = function (rawElement) {
        var cellPosition = $(rawElement).attr("position");
        if(this.board[cellPosition] === undefined){
            display.playerSymbol(rawElement, player.currentCharacter.symbol);
            this.markArray(cellPosition);
            this.winCheck();
            player.switch();
        }
    };

    this.markArray = function (arrayIndex) {
        this.board[arrayIndex] = player.currentCharacter.symbol;
    };

    this.winCheck = function () {
        for(i = 0; i < this.winCombination.length; i++){
            if(this.board[this.winCombination[i][0]] === player.currentCharacter.symbol && this.board[this.winCombination[i][1]] === player.currentCharacter.symbol && this.board[this.winCombination[i][2]] === player.currentCharacter.symbol){
                alert("Player " + player.currentCharacter.symbol + " wins");
            }
        }
    }
}

function playerConstructor() {
    this.create = function () {
        this.character = [
            {element: $("#player1").addClass('current_player')},
            {element: $("#player2")}
        ];
        this.character[0].symbol = this.character[0].element.text();
        this.character[1].symbol = this.character[1].element.text();
        this.currentCharacter = this.character[0];
    };
    this.activate = function (playerToActiv) {
        playerToActiv.element.addClass('current_player');
        this.currentCharacter = playerToActiv;
    };

    this.deactivate = function (playerToDeact) {
        playerToDeact.element.removeClass('current_player');
    };

    this.switch = function () {
        if(this.currentCharacter === this.character[0]) {
            this.deactivate(this.character[0]);
            this.activate(this.character[1]);
            console.log("Current player is: " + this.currentCharacter.symbol);
        } else {
            this.deactivate(this.character[1]);
            this.activate(this.character[0]);
            console.log("Current player is: " + this.currentCharacter.symbol);
        }
    };
}

function displayConstructor() {
    this.playerSymbol = function (location, valueToDisplay) {
        $(location).text(valueToDisplay);
    }
}