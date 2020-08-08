import React from 'react';
import Menu from './Components/Menu';
import Board from './Components/Board';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.generateNewBoardHandler = this.generateNewBoardHandler.bind(this);
    this.clickTileHandler = this.clickTileHandler.bind(this);
    let board = [];
    for(let i=0; i<8; i++){
      let row = [];
      for(let j=0; j<8; j++){
        row[j] = {
          id: `${8-i}${String.fromCharCode(65+j)}`,
          color: (i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0) ? 'colorWhite' : 'colorBlack',
          activeState: false,
          piece: null
        }
      }
      board[i] = row;
    }
    this.previousMoves = [];
    this.state = {
      actualBoard : board,
      isWhiteTurn : null,
      focus : null
    }
  }
  generateNewBoardHandler(){
    let board = JSON.parse(JSON.stringify(this.state.actualBoard));
    for(let i=2; i<6; i++){
      for(let tile of board[i]){
        tile.piece = null;
        tile.activeState = false;
      }
    }
    board[0][0].piece = 'blackRook';
    board[0][1].piece = 'blackKnight';
    board[0][2].piece = 'blackBishop';
    board[0][3].piece = 'blackQueen';
    board[0][4].piece = 'blackKing';
    board[0][5].piece = 'blackBishop';
    board[0][6].piece = 'blackKnight';
    board[0][7].piece = 'blackRook';
    board[1][0].piece = 'blackPawn';
    board[1][1].piece = 'blackPawn';
    board[1][2].piece = 'blackPawn';
    board[1][3].piece = 'blackPawn';
    board[1][4].piece = 'blackPawn';
    board[1][5].piece = 'blackPawn';
    board[1][6].piece = 'blackPawn';
    board[1][7].piece = 'blackPawn';
    board[7][0].piece = 'whiteRook';
    board[7][1].piece = 'whiteKnight';
    board[7][2].piece = 'whiteBishop';
    board[7][3].piece = 'whiteQueen';
    board[7][4].piece = 'whiteKing';
    board[7][5].piece = 'whiteBishop';
    board[7][6].piece = 'whiteKnight';
    board[7][7].piece = 'whiteRook';
    board[6][0].piece = 'whitePawn';
    board[6][1].piece = 'whitePawn';
    board[6][2].piece = 'whitePawn';
    board[6][3].piece = 'whitePawn';
    board[6][4].piece = 'whitePawn';
    board[6][5].piece = 'whitePawn';
    board[6][6].piece = 'whitePawn';
    board[6][7].piece = 'whitePawn';
    this.setState({
      isWhiteTurn : true,
      actualBoard : board,
      focus: null
    });
  }
  clickTileHandler(tile){
    console.log(tile);
    if(this.state.focus === null){
      if(tile.piece === null) return;
      switch(tile.piece){
        case 'whitePawn':
          this.pawnPossibleMoves(tile.id, true);
          break;
        case 'blackPawn':
          this.pawnPossibleMoves(tile.id, false);
          break;
        default:
          break;
      }
    }
    else{
      if(tile.id === this.state.focus){
        let board = JSON.parse(JSON.stringify(this.state.actualBoard));
        for(let row of board){
          for(let tile of row){
            tile.activeState = false;
          }
        }
        this.setState({
          actualBoard: board,
          focus : null
        })
      }
    }
  }
  pawnPossibleMoves(tileId, isWhite){
    let possibleMoves = [];
    let x = tileId.charCodeAt(1)-65;
    let y = 8-Number(tileId[0]);
    let board = JSON.parse(JSON.stringify(this.state.actualBoard));
    if(isWhite){
      if(y === 6){
        possibleMoves.push({x : x, y: y-1});
        possibleMoves.push({x : x, y: y-2});
        if(x+1 <= 7 && board[y-1][x+1].piece != null && board[y-1][x+1].piece.startsWidth('black')) possibleMoves.push({x : x+1, y: y-1});
        if(x-1 >= 0 && board[y-1][x-1].piece != null && board[y-1][x-1].piece.startsWidth('black')) possibleMoves.push({x : x-1, y: y-1});
      }
      else{
        //Should normally always happen since
        //Pawns transform themselves in other pieces at the end of the board
        if(y-1 >= 0){
          possibleMoves.push({x : x, y: y-1});
          if(x+1 <= 7 && board[y-1][x+1].piece != null && board[y-1][x+1].piece.startsWidth('black')) possibleMoves.push({x : x+1, y: y-1});
          if(x-1 >= 0 && board[y-1][x-1].piece != null && board[y-1][x-1].piece.startsWidth('black')) possibleMoves.push({x : x-1, y: y-1});
        }
      }
    }
    else{
      if(y === 1){
        possibleMoves.push({x : x, y: y+1});
        possibleMoves.push({x : x, y: y+2});
        if(x+1 <= 7 && board[y+1][x+1].piece != null && board[y+1][x+1].piece.startsWidth('white')) possibleMoves.push({x : x+1, y: y+1});
        if(x-1 >= 0 && board[y+1][x-1].piece != null && board[y+1][x-1].piece.startsWidth('white')) possibleMoves.push({x : x-1, y: y+1});
      }
      else{
        //Should normally always happen since
        //Pawns transform themselves in other pieces at the end of the board
        if(y+1 <= 7){
          possibleMoves.push({x : x, y: y+1});
          if(x+1 <= 7 && board[y+1][x+1].piece != null && board[y+1][x+1].piece.startsWidth('white')) possibleMoves.push({x : x+1, y: y+1});
          if(x-1 >= 0 && board[y+1][x-1].piece != null && board[y+1][x-1].piece.startsWidth('white')) possibleMoves.push({x : x-1, y: y+1});
        }
      }
    }
    for(let move of possibleMoves){
      board[move.y][move.x].activeState = true;
    }
    this.setState({
      actualBoard: board,
      focus: tileId
    });
  }
  render(){
    return(
      <div>
        <Menu onGenerateNewBoard={this.generateNewBoardHandler} />
        <Board actualBoard={this.state.actualBoard} onTileClick={this.clickTileHandler} />
      </div>
    );
  }
}
