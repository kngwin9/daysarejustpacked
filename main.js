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

$(document).ready(function () {
    click_handler();
});


function click_handler() {
    $("#grid_board").on('click' , 'div' , function(){
       game.engine($(this).attr("value"));
    });
}

// Main game.
function gameConstructor() {
    this.winningPattern = [];
    this.engine = function (userPositionInput) {
    }
}

// Grid template for color selector and player change.
function gridTemplate(selected) {
    var selected = this;

}




