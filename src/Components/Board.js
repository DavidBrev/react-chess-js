import React from 'react';

export default class Board extends React.Component{
  render(){
    return(
      <table>
        <tbody>
          {
            /*Generate Board here*/
            this.props.actualBoard.map((row, i) => (
              <tr key={i}>
                {
                  row.map(tile => (
                    <td
                      onClick={() => this.props.onTileClick(tile)}
                      key={tile.id}
                      className={`tile ${tile.color}${tile.piece !== null ? ` ${tile.piece}` : ''}${tile.activeState ? ' activeState' : ''}`}
                      id={`${tile.id}`} >
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}
