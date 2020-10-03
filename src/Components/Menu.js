import React from 'react';

export default class Menu extends React.Component{
  renderButton(){
    if(this.props.isWhiteTurn === null)
      return <span>N/A</span>;
    else
      return <button className={`turnButton ${this.props.isWhiteTurn ? 'whiteButton' : 'blackButton'}`} ></button>;
  }
  render(){
    return(
      <div>
        <div className='alignHorizontal adjustGameWidth'>
          <button onClick={this.props.onGenerateNewBoard}>New game</button>
          <div className='alignHorizontal'>
            <span>Turn : </span>
            {this.renderButton()}
          </div>
        </div>
        <div className='alignHorizontal adjustGameWidth'>
          <span>White Status : {this.props.whiteState === null ? 'N/A' : this.props.whiteState}</span>
          <span>Black Status : {this.props.blackState === null ? 'N/A' : this.props.blackState}</span>
        </div>
      </div>
    )
  }
}
