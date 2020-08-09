import React from 'react';
import Menu from './Components/Menu';
import Board from './Components/Board';
import PiecesTaken from './Components/PiecesTaken';

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
      whiteTaken: [],
      blackTaken: [],
      isWhiteTurn : null,
      focus : null,
    }
  }
  generateNewBoardHandler(){
    let board = JSON.parse(JSON.stringify(this.state.actualBoard));
    for(let i=0; i<8; i++){
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
      focus: null,
      whiteTaken : [],
      blackTaken : []
    });
  }
  clickTileHandler(tile){
    console.log(tile);
    if(this.state.focus === null){
      if(tile.piece === null) return;
      switch(tile.piece){
        case 'whitePawn':
          if(this.state.isWhiteTurn) this.pawnPossibleMoves(tile.id, true);
          break;
        case 'blackPawn':
          if(!this.state.isWhiteTurn) this.pawnPossibleMoves(tile.id, false);
          break;
        case 'whiteKnight':
          if(this.state.isWhiteTurn) this.knightPossibleMoves(tile.id, true);
          break;
        case 'blackKnight':
          if(!this.state.isWhiteTurn) this.knightPossibleMoves(tile.id, false);
          break;
        case 'whiteRook':
          if(this.state.isWhiteTurn) this.rookPossibleMoves(tile.id, true);
          break;
        case 'blackRook':
          if(!this.state.isWhiteTurn) this.rookPossibleMoves(tile.id, false);
          break;
        case 'whiteBishop':
          if(this.state.isWhiteTurn) this.bishopPossibleMoves(tile.id, true);
          break;
        case 'blackBishop':
          if(!this.state.isWhiteTurn) this.bishopPossibleMoves(tile.id, false);
          break;
        case 'whiteQueen':
          if(this.state.isWhiteTurn) this.queenPossibleMoves(tile.id, true);
          break;
        case 'blackQueen':
          if(!this.state.isWhiteTurn) this.queenPossibleMoves(tile.id, false);
          break;
        case 'whiteKing':
          if(this.state.isWhiteTurn) this.kingPossibleMoves(tile.id, true);
          break;
        case 'blackKing':
          if(!this.state.isWhiteTurn) this.kingPossibleMoves(tile.id, false);
          break;
        default:
          break;
      }
    }
    else{
      let board = JSON.parse(JSON.stringify(this.state.actualBoard));
      if(tile.id === this.state.focus){
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
      else if(tile.activeState){
        let wT = this.state.whiteTaken.slice();
        let bT = this.state.blackTaken.slice();
        let x = tile.id.charCodeAt(1)-65;
        let y = 8-Number(tile.id[0]);
        let focusX = this.state.focus.charCodeAt(1)-65;
        let focusY = 8-Number(this.state.focus[0]);
        let p = board[focusY][focusX].piece;
        let t = board[y][x].piece;
        if(t !== null){
          if(t.startsWith('white')) wT.push(t);
          else bT.push(t);
        }
        board[focusY][focusX].piece = null;
        board[y][x].piece = p;
        for(let row of board){
          for(let tile of row){
            tile.activeState = false;
          }
        }
        this.setState({
          actualBoard: board,
          focus : null,
          whiteTaken : wT,
          blackTaken : bT,
          isWhiteTurn : !this.state.isWhiteTurn
        })
      }
    }
  }
  //Could use a rework
  pawnPossibleMoves(tileId, isWhite){
    let possibleMoves = [];
    let x = tileId.charCodeAt(1)-65;
    let y = 8-Number(tileId[0]);
    let board = JSON.parse(JSON.stringify(this.state.actualBoard));
    if(isWhite){
      if(y === 6){
        if(board[y-1][x].piece === null){
          possibleMoves.push({x : x, y: y-1});
          if(board[y-2][x].piece === null) possibleMoves.push({x : x, y: y-2});
        }
        if(x+1 <= 7 && board[y-1][x+1].piece !== null && board[y-1][x+1].piece.startsWith('black')) possibleMoves.push({x : x+1, y: y-1});
        if(x-1 >= 0 && board[y-1][x-1].piece !== null && board[y-1][x-1].piece.startsWith('black')) possibleMoves.push({x : x-1, y: y-1});
      }
      else{
        //Should normally always happen since
        //Pawns transform themselves in other pieces at the end of the board
        if(y-1 >= 0){
          console.log(board[y-1][x+1].piece);
          if(board[y-1][x].piece === null) possibleMoves.push({x : x, y: y-1});
          if(x+1 <= 7 && board[y-1][x+1].piece !== null && board[y-1][x+1].piece.startsWith('black')) possibleMoves.push({x : x+1, y: y-1});
          if(x-1 >= 0 && board[y-1][x-1].piece !== null && board[y-1][x-1].piece.startsWith('black')) possibleMoves.push({x : x-1, y: y-1});
        }
      }
    }
    else{
      if(y === 1){
        if(board[y+1][x].piece === null){
          possibleMoves.push({x : x, y: y+1});
          if(board[y+2][x].piece === null) possibleMoves.push({x : x, y: y+2});
        }
        if(x+1 <= 7 && board[y+1][x+1].piece !== null && board[y+1][x+1].piece.startsWith('white')) possibleMoves.push({x : x+1, y: y+1});
        if(x-1 >= 0 && board[y+1][x-1].piece !== null && board[y+1][x-1].piece.startsWith('white')) possibleMoves.push({x : x-1, y: y+1});
      }
      else{
        //Should normally always happen since
        //Pawns transform themselves in other pieces at the end of the board
        if(y+1 <= 7){
          if(board[y+1][x].piece === null) possibleMoves.push({x : x, y: y+1});
          if(x+1 <= 7 && board[y+1][x+1].piece !== null && board[y+1][x+1].piece.startsWith('white')) possibleMoves.push({x : x+1, y: y+1});
          if(x-1 >= 0 && board[y+1][x-1].piece !== null && board[y+1][x-1].piece.startsWith('white')) possibleMoves.push({x : x-1, y: y+1});
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
  knightPossibleMoves(tileId, isWhite){
    let possibleMoves = [];
    let x = tileId.charCodeAt(1)-65;
    let y = 8-Number(tileId[0]);
    let board = JSON.parse(JSON.stringify(this.state.actualBoard));
    if(y+2 < 8){
      if(x+2 < 8){
        if(board[y+2][x+1].piece === null || (isWhite ? board[y+2][x+1].piece.startsWith('black') : board[y+2][x+1].piece.startsWith('white'))) possibleMoves.push({x : x+1, y : y+2});
        if(board[y+1][x+2].piece === null || (isWhite ? board[y+1][x+2].piece.startsWith('black') : board[y+1][x+2].piece.startsWith('white'))) possibleMoves.push({x : x+2, y : y+1});
      }
      else if(x+1 < 8){
        if(board[y+2][x+1].piece === null || (isWhite ? board[y+2][x+1].piece.startsWith('black') : board[y+2][x+1].piece.startsWith('white'))) possibleMoves.push({x : x+1, y : y+2});
      }
      if(x-2 >= 0){
        if(board[y+2][x-1].piece === null || (isWhite ? board[y+2][x-1].piece.startsWith('black') : board[y+2][x-1].piece.startsWith('white'))) possibleMoves.push({x : x-1, y : y+2});
        if(board[y+1][x-2].piece === null || (isWhite ? board[y+1][x-2].piece.startsWith('black') : board[y+1][x-2].piece.startsWith('white'))) possibleMoves.push({x : x-2, y : y+1});
      }
      else if(x-1 >= 0){
        if(board[y+2][x-1].piece === null || (isWhite ? board[y+2][x-1].piece.startsWith('black') : board[y+2][x-1].piece.startsWith('white'))) possibleMoves.push({x : x-1, y : y+2});
      }
    }
    else if(y+1 < 8){
      if(x+2 < 8){
        if(board[y+1][x+2].piece === null || (isWhite ? board[y+1][x+2].piece.startsWith('black') : board[y+1][x+2].piece.startsWith('white'))) possibleMoves.push({x : x+2, y : y+1});
      }
      if(x-2 >= 0){
        if(board[y+1][x-2].piece === null || (isWhite ? board[y+1][x-2].piece.startsWith('black') : board[y+1][x-2].piece.startsWith('white'))) possibleMoves.push({x : x-2, y : y+1});
      }
    }
    if(y-2 >= 0){
      if(x+2 < 8){
        if(board[y-2][x+1].piece === null || (isWhite ? board[y-2][x+1].piece.startsWith('black') : board[y-2][x+1].piece.startsWith('white'))) possibleMoves.push({x : x+1, y : y-2});
        if(board[y-1][x+2].piece === null || (isWhite ? board[y-1][x+2].piece.startsWith('black') : board[y-1][x+2].piece.startsWith('white'))) possibleMoves.push({x : x+2, y : y-1});
      }
      else if(x+1 < 8){
        if(board[y-2][x+1].piece === null || (isWhite ? board[y-2][x+1].piece.startsWith('black') : board[y-2][x+1].piece.startsWith('white'))) possibleMoves.push({x : x+1, y : y-2});
      }
      if(x-2 >= 0){
        if(board[y-2][x-1].piece === null || (isWhite ? board[y-2][x-1].piece.startsWith('black') : board[y-2][x-1].piece.startsWith('white'))) possibleMoves.push({x : x-1, y : y-2});
        if(board[y-1][x-2].piece === null || (isWhite ? board[y-1][x-2].piece.startsWith('black') : board[y-1][x-2].piece.startsWith('white'))) possibleMoves.push({x : x-2, y : y-1});
      }
      else if(x-1 >= 0){
        if(board[y-2][x-1].piece === null || (isWhite ? board[y-2][x-1].piece.startsWith('black') : board[y-2][x-1].piece.startsWith('white'))) possibleMoves.push({x : x-1, y : y-2});
      }
    }
    else if(y-1 >= 0){
      if(x-2 >= 0){
        if(board[y-1][x-2].piece === null || (isWhite ? board[y-1][x-2].piece.startsWith('black') : board[y-1][x-2].piece.startsWith('white'))) possibleMoves.push({x : x-2, y : y-1});
      }
      if(x+2 < 8){
        if(board[y-1][x+2].piece === null || (isWhite ? board[y-1][x+2].piece.startsWith('black') : board[y-1][x+2].piece.startsWith('white'))) possibleMoves.push({x : x+2, y : y-1});
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
  rookPossibleMoves(tileId, isWhite, returnData = false){
    let possibleMoves = [];
    let x = tileId.charCodeAt(1)-65;
    let y = 8-Number(tileId[0]);
    let board = JSON.parse(JSON.stringify(this.state.actualBoard));
    //up
    let pathEnded = false;
    for(let i=1; !pathEnded; i++){
      if(y-i < 0){
        pathEnded = true;
      }
      else if(board[y-i][x].piece !== null){
        if(isWhite ? board[y-i][x].piece.startsWith('black') : board[y-i][x].piece.startsWith('white')){
          possibleMoves.push({x : x, y : y-i});
          pathEnded = true;
        }
        else pathEnded = true;
      }
      else{
        possibleMoves.push({x : x, y : y-i});
      }
    }
    //down
    pathEnded = false;
    for(let i=1; !pathEnded; i++){
      if(y+i > 7){
        pathEnded = true;
      }
      else if(board[y+i][x].piece !== null){
        if(isWhite ? board[y+i][x].piece.startsWith('black') : board[y+i][x].piece.startsWith('white')){
          possibleMoves.push({x : x, y : y+i});
          pathEnded = true;
        }
        else pathEnded = true;
      }
      else{
        possibleMoves.push({x : x, y : y+i});
      }
    }
    //left
    pathEnded = false;
    for(let i=1; !pathEnded; i++){
      if(x-i < 0){
        pathEnded = true;
      }
      else if(board[y][x-i].piece !== null){
        if(isWhite ? board[y][x-i].piece.startsWith('black') : board[y][x-i].piece.startsWith('white')){
          possibleMoves.push({x : x-i, y : y});
          pathEnded = true;
        }
        else pathEnded = true;
      }
      else{
        possibleMoves.push({x : x-i, y : y});
      }
    }
    //right
    pathEnded = false;
    for(let i=1; !pathEnded; i++){
      if(x+i > 7){
        pathEnded = true;
      }
      else if(board[y][x+i].piece !== null){
        if(isWhite ? board[y][x+i].piece.startsWith('black') : board[y][x+i].piece.startsWith('white')){
          possibleMoves.push({x : x+i, y : y});
          pathEnded = true;
        }
        else pathEnded = true;
      }
      else{
        possibleMoves.push({x : x+i, y : y});
      }
    }
    if(returnData){
      return possibleMoves;
    }
    else{
      for(let move of possibleMoves){
        board[move.y][move.x].activeState = true;
      }
      this.setState({
        actualBoard: board,
        focus: tileId
      });
    }
  }
  bishopPossibleMoves(tileId, isWhite, returnData = false){
    let possibleMoves = [];
    let x = tileId.charCodeAt(1)-65;
    let y = 8-Number(tileId[0]);
    let board = JSON.parse(JSON.stringify(this.state.actualBoard));
    //right-up
    let pathEnded = false;
    for(let i=1; !pathEnded; i++){
      if(y-i < 0 || x+i > 7){
        pathEnded = true;
      }
      else if(board[y-i][x+i].piece !== null){
        if(isWhite ? board[y-i][x+i].piece.startsWith('black') : board[y-i][x+i].piece.startsWith('white')){
          possibleMoves.push({x : x+i, y : y-i});
          pathEnded = true;
        }
        else pathEnded = true;
      }
      else{
        possibleMoves.push({x : x+i, y : y-i});
      }
    }
    //right-down
    pathEnded = false;
    for(let i=1; !pathEnded; i++){
      if(y+i > 7 || x+i > 7){
        pathEnded = true;
      }
      else if(board[y+i][x+i].piece !== null){
        if(isWhite ? board[y+i][x+i].piece.startsWith('black') : board[y+i][x+i].piece.startsWith('white')){
          possibleMoves.push({x : x+i, y : y+i});
          pathEnded = true;
        }
        else pathEnded = true;
      }
      else{
        possibleMoves.push({x : x+i, y : y+i});
      }
    }
    //left-down
    pathEnded = false;
    for(let i=1; !pathEnded; i++){
      if(y+i > 7 || x-i < 0){
        pathEnded = true;
      }
      else if(board[y+i][x-i].piece !== null){
        if(isWhite ? board[y+i][x-i].piece.startsWith('black') : board[y+i][x-i].piece.startsWith('white')){
          possibleMoves.push({x : x-i, y : y+i});
          pathEnded = true;
        }
        else pathEnded = true;
      }
      else{
        possibleMoves.push({x : x-i, y : y+i});
      }
    }
    //left-up
    pathEnded = false;
    for(let i=1; !pathEnded; i++){
      if(y-i < 0 || x-i < 0){
        pathEnded = true;
      }
      else if(board[y-i][x-i].piece !== null){
        if(isWhite ? board[y-i][x-i].piece.startsWith('black') : board[y-i][x-i].piece.startsWith('white')){
          possibleMoves.push({x : x-i, y : y-i});
          pathEnded = true;
        }
        else pathEnded = true;
      }
      else{
        possibleMoves.push({x : x-i, y : y-i});
      }
    }
    if(returnData){
      return possibleMoves;
    }
    else{
      for(let move of possibleMoves){
        board[move.y][move.x].activeState = true;
      }
      this.setState({
        actualBoard: board,
        focus: tileId
      });
    }
  }
  queenPossibleMoves(tileId, isWhite){
    let board = JSON.parse(JSON.stringify(this.state.actualBoard));
    let rookMoves = this.rookPossibleMoves(tileId, isWhite, true);
    let bishopMoves = this.bishopPossibleMoves(tileId, isWhite, true);
    let possibleMoves = [...rookMoves, ...bishopMoves];
    for(let move of possibleMoves){
      board[move.y][move.x].activeState = true;
    }
    this.setState({
      actualBoard: board,
      focus: tileId
    });
  }
  //The method below is meant to be reworked
  kingPossibleMoves(tileId, isWhite){
    let possibleMoves = [];
    let x = tileId.charCodeAt(1)-65;
    let y = 8-Number(tileId[0]);
    let board = JSON.parse(JSON.stringify(this.state.actualBoard));
    if(y-1 >= 0){
      if(board[y-1][x].piece === null || (isWhite ? board[y-1][x].piece.startsWith('black') : board[y-1][x].piece.startsWith('white'))) possibleMoves.push({x : x, y : y-1});
      if(x+1 < 8){
        if(board[y-1][x+1].piece === null || (isWhite ? board[y-1][x+1].piece.startsWith('black') : board[y-1][x+1].piece.startsWith('white'))) possibleMoves.push({x : x+1, y : y-1});
      }
      if(x-1 >= 0){
        if(board[y-1][x-1].piece === null || (isWhite ? board[y-1][x-1].piece.startsWith('black') : board[y-1][x-1].piece.startsWith('white'))) possibleMoves.push({x : x-1, y : y-1});
      }
    }
    if(y+1 < 8){
      if(board[y+1][x].piece === null || (isWhite ? board[y+1][x].piece.startsWith('black') : board[y+1][x].piece.startsWith('white'))) possibleMoves.push({x : x, y : y+1});
      if(x+1 < 8){
        if(board[y+1][x+1].piece === null || (isWhite ? board[y+1][x+1].piece.startsWith('black') : board[y+1][x+1].piece.startsWith('white'))) possibleMoves.push({x : x+1, y : y+1});
      }
      if(x-1 >= 0){
        if(board[y+1][x-1].piece === null || (isWhite ? board[y+1][x-1].piece.startsWith('black') : board[y+1][x-1].piece.startsWith('white'))) possibleMoves.push({x : x-1, y : y+1});
      }
    }
    //By checking the 2 conditions below on their own
    //I am sure their content is not added twice in possibleMoves
    if(x+1 < 8){
      if(board[y][x+1].piece === null || (isWhite ? board[y][x+1].piece.startsWith('black') : board[y][x+1].piece.startsWith('white'))) possibleMoves.push({x : x+1, y : y});
    }
    if(x-1 >= 0){
      if(board[y][x-1].piece === null || (isWhite ? board[y][x-1].piece.startsWith('black') : board[y][x-1].piece.startsWith('white'))) possibleMoves.push({x : x-1, y : y});
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
        <Menu onGenerateNewBoard={this.generateNewBoardHandler} isWhiteTurn={this.state.isWhiteTurn} />
        <div className="gameDisplay">
          <PiecesTaken pieces={this.state.whiteTaken} isWhite={true} />
          <Board actualBoard={this.state.actualBoard} onTileClick={this.clickTileHandler} focus={this.state.focus} />
          <PiecesTaken pieces={this.state.blackTaken} isWhite={false} />
        </div>
      </div>
    );
  }
}
