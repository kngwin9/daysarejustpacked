/**
 * Created by kngwin9 on 3/13/17.
 */
//this will be used to create cells, a component of the game board
var cellTemplate = function(parent){

};
//this will be used to create a game board of our choice in size, by calling on the cellTemp and creating as many divs as needed
//will also need to call onto playerTemp to create players for this board
var gameTemplate=function(mainElement,gameSize){

};
//this will create a 2 player dynamic, letting player 1 be X and player 2 be O's
var playerTemplate = function(symbol, element){

};
//this calls the other functions and will make the new instance of game_Temp

var mainGame = null;
$(document).ready(function){
    mainGame = new gameTemplate($('#grid_board'));
    mainGame.createCells(9);
    mainGame.createPlayers();
}