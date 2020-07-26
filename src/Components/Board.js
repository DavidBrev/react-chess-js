import React from 'react';

export default class Board extends React.Component{
  constructor(props){
    super(props);
    let board = [];
    for(let i=0; i<8; i++){
      let row = [];
      for(let j=0; j<8; j++){
        row[j] = {
          id: `${8-i}${String.fromCharCode(65+j)}`,
          color: (i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0) ? 'colorWhite' : 'colorBlack',
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
      <table>
        {
          /*Generate Board here*/
          this.state.actualBoard.map(row => (
            <tr>
              {
                row.map(tile => (
                  <td class={`tile ${tile.color}${tile.activeState ? ' path' : ''}`} id={`${tile.id}`} ></td>
                ))
              }
            </tr>
          ))
        }
      </table>
    )
  }
}
