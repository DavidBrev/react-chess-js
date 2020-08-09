import React from 'react';

export default class Menu extends React.Component{
  renderButton(){
    if(this.props.isWhiteTurn === null)
      return <span>No game currently in progress.</span>;
    else
      return <button className={`turnButton ${this.props.isWhiteTurn ? 'whiteButton' : 'blackButton'}`} ></button>;
  }
  render(){
    return(
      <div className='alignHorizontal adjustGameWidth'>
        <button onClick={this.props.onGenerateNewBoard}>New game</button>
        <div className='alignHorizontal'>
          <span>Turn : </span>
          {this.renderButton()}
        </div>
      </div>
    )
  }
}
