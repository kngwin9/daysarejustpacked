var game = null;
$(document).ready(function(){
    game = new gameConstructor($('#grid_board'));
    $(".dropdown-content a").click(function() {
        if ($(this).hasClass('med')){
            game.createCells(16);
            $('.grid').toggleClass('med');
        } else if ($(this).hasClass('hard')){
            game.createCells(25);
            $('.grid').toggleClass('hard');
        } else{
            game.createCells(9);
            $('.grid').toggleClass('ez');
        }
    });
    game.createPlayers()
});
function gameConstructor(main){
    var self=this;
    this.element = main;
    this.cellArray = [];
    this.players =[];
    this.currentPlayer = 0;
    this.createCells = function(amountCells){
        this.element.empty();
        this.cellArray=[];
        for (var i=0;i<amountCells;i++) {
            var newCell = new gridTemplate(this);                       //makes a call to create new cells for our game instance
            var newCellElement = newCell.createSelf();                  //new cells will be created as div vars
            this.cellArray.push(newCell);
            this.element.append(newCellElement);
        }
    };
    this.createPlayers = function(){
        var player1 =new playerFactory('X',$('#player1'));              //players will pass a value, and id
        var player2 = new playerFactory('O', $('#player2'));
        this.players.push(player1);
        this.players.push(player2);
        this.players = this.players.sort(function () {
            return 0.5 - Math.random()
        });
        this.players[0].activePlayer();
    };
    this.switchPlayers = function(){
        if(this.currentPlayer){
            this.currentPlayer=0;
        } else {
            this.currentPlayer=1;
        }
    };
    this.getCurrentPlayer = function (){
        return this.players[this.currentPlayer];
    };
    this.cellClicked =function(clickedCell){
        self.players[self.currentPlayer].deactivatePlayer();
        self.checkWinningCondition();
        self.switchPlayers();
        self.players[self.currentPlayer].activePlayer();
    };
    this.checkWinningCondition=function(){
        var arr = game.cellArray;
        var rowLength = Math.sqrt(arr.length);
        //diagonal to right
        var counter=0;
        for(i = 0; i <= arr.length -1; i+= rowLength + 1){
            if (arr[i].symbol === game.players[game.currentPlayer].symbol){
                counter++;
            }
            if (counter === rowLength){
                modal_display();
                return;
            }
        }
        counter = 0;
        //diagonal to left
        for(i = rowLength -1 ; i < arr.length -1; i+= rowLength - 1){
            if (arr[i].symbol === game.players[game.currentPlayer].symbol){
                counter++;
            }
            if (counter===rowLength){
                modal_display();
                return
            }
        }
        counter = 0;
        // horizontal solution
        var i = 0;
        for(x = 0; x < arr.length -1; x += rowLength){
            console.log();
            while (i < rowLength + x){
                if (arr[i].symbol === game.players[game.currentPlayer].symbol){
                    counter++;
                }
                if (counter===rowLength){
                    modal_display();
                    return
                }
                i++;
            }
            counter = 0;
        }
        //vertical solution
        var y = 0;
        for(z = 1; z <= rowLength; z++){
            while (y <= arr.length -1){
                if (arr[y].symbol === game.players[game.currentPlayer].symbol){
                    counter++;
                }
                if (counter===rowLength){
                    modal_display();
                    return
                }
                y+=rowLength;
            }
            y=z;
            counter = 0;
        }
    };
}
var gridTemplate = function (owner){
    var self = this;                                         //this chances each time it's run, stores a temp value for each grid
    this.owner = owner;
    this.symbol = null;
    this.element = null;                                    //our instantization of a particular div variable
    this.createSelf= function(){                            //dynamically create divs for our game
        this.element=$('<div>',{
            class: "grid"
        }).click(this.cellClick);                           //attaches a click handle to each div instance
        return this.element;
    };
    this.cellClick = function(){                            //it knows which div is clicked
        if (self.element.hasClass('clicked')){
            return;
        }
        var currentPlayer = self.owner.getCurrentPlayer();  //tells us who owns the turn, since the divs
        self.symbol = currentPlayer.getSymbol();
        self.element.addClass('clicked');
        self.changeSymbol(self.symbol);
        self.owner.cellClicked(self);
    };
    this.changeSymbol = function(symbol){
        self.element.text(symbol)
    };
    this.getSymbol=function(){
        return self.symbol;
    };
};
var playerFactory = function(symbol, element){
    this.symbol = symbol;
    this.element = element;
    this.activePlayer = function(){
        this.element.addClass('current_player');
    };
    this.deactivatePlayer = function (){
        this.element.removeClass('current_player');
    };
    this.getSymbol = function(){
        return this.symbol;
    }
};
function modal_display() {
    $("#myModal").modal();
}