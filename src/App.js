import React from 'react';
import Menu from './Components/Menu';
import Board from './Components/Board';
import Piece from './Classes/Piece';

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
    this.pieces = [];
    this.previousMoves = [];
    this.state = {
      actualBoard : board,
      isWhiteTurn : null,
      focus : null
    }
  }
  generateNewBoardHandler(){
    let newPieces = [];
    newPieces[0] = new Piece('whiteRook',    '1A');
    newPieces[1] = new Piece('whiteKnight',  '1B');
    newPieces[2] = new Piece('whiteBishop',  '1C');
    newPieces[3] = new Piece('whiteQueen',   '1D');
    newPieces[4] = new Piece('whiteKing',    '1E');
    newPieces[5] = new Piece('whiteBishop',  '1F');
    newPieces[6] = new Piece('whiteKnight',  '1G');
    newPieces[7] = new Piece('whiteRook',    '1H');
    newPieces[8] = new Piece('whitePawn',    '2A');
    newPieces[9] = new Piece('whitePawn',    '2B');
    newPieces[10] = new Piece('whitePawn',   '2C');
    newPieces[11] = new Piece('whitePawn',   '2D');
    newPieces[12] = new Piece('whitePawn',   '2E');
    newPieces[13] = new Piece('whitePawn',   '2F');
    newPieces[14] = new Piece('whitePawn',   '2G');
    newPieces[15] = new Piece('whitePawn',   '2H');
    newPieces[16] = new Piece('blackRook',   '8A');
    newPieces[17] = new Piece('blackKnight', '8B');
    newPieces[18] = new Piece('blackBishop', '8C');
    newPieces[19] = new Piece('blackQueen',  '8D');
    newPieces[20] = new Piece('blackKing',   '8E');
    newPieces[21] = new Piece('blackBishop', '8F');
    newPieces[22] = new Piece('blackKnight', '8G');
    newPieces[23] = new Piece('blackRook',   '8H');
    newPieces[24] = new Piece('blackPawn',   '7A');
    newPieces[25] = new Piece('blackPawn',   '7B');
    newPieces[26] = new Piece('blackPawn',   '7C');
    newPieces[27] = new Piece('blackPawn',   '7D');
    newPieces[28] = new Piece('blackPawn',   '7E');
    newPieces[29] = new Piece('blackPawn',   '7F');
    newPieces[30] = new Piece('blackPawn',   '7G');
    newPieces[31] = new Piece('blackPawn',   '7H');
    this.pieces = newPieces;
    this.setState({isWhiteTurn : true});
    this.updateBoard();
  }
  clickTileHandler(tile){
    console.log(tile);
    if(this.focus === null){
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
  updateBoard(){
    let newBoard = JSON.parse(JSON.stringify(this.state.actualBoard));
    for(let row of newBoard){
      for(let tile of row){
        let found = false;
        for(let piece of this.pieces){
          if(piece.GetPosition() === tile.id){
            tile.piece = piece.GetType();
            found = true;
            break;
          }
        }
        if(!found) tile.piece = null;
      }
    }
    this.setState({
      actualBoard : newBoard
    })
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
