import React from 'react';

export default class PiecesTaken extends React.Component{
  render(){
    return(
      <div className={`deathBox ${this.props.isWhite ? 'whiteTaken' : 'blackTaken'}`}>
        {this.props.pieces.map((piece, i) => {
          return (
            <span key={i} className={`tile ${piece}`} ></span>
          )
        })}
      </div>
    )
  }
}
