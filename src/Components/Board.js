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
                    <td key={tile.id} className={`tile ${tile.color}${tile.piece !== null ? ` ${tile.piece}` : ''}`} id={`${tile.id}`} ></td>
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
