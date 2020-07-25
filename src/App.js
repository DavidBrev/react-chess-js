import React from 'react';
import Menu from './Components/Menu';
import Board from './Components/Board';

export default class App extends React.Component{
  render(){
    return(
      <div>
        <Menu />
        <Board />
      </div>
    );
  }
}
