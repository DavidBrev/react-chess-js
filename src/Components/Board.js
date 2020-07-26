import React from 'react';

export default class Board extends React.Component{
  constructor(props){
    super(props);
    let board = [];
    for(let i=0; i<8; i++){
      let row = [];
      for(let j=0; j<8; j++){
        row[j] = {
          id: `${i+1}${String.fromCharCode(65+j)}`,
          color: (i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0) ? 'black' : 'white',
          activeState: false
        }
      }
      board[i] = row;
    }
    this.state = {
      previousMoves : [],
      actualBoard : board,
      pieces: []
    }
  }
  render(){
    return(
      <div>
        {/*Generate Board here*/console.log(this.state.actualBoard)}
      </div>
    )
  }
}
