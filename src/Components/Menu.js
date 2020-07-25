import React from 'react';

export default class Menu extends React.Component{
  render(){
    return(
      <div>
        <button>New game</button>
        <button>Save game</button>
        <button>Load game</button>
        <div>
          <button>Previous Move</button>
          <button>Next Move</button>
        </div>
      </div>
    )
  }
}
