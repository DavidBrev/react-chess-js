import React from 'react';

export default class SelectReplacement extends React.Component {
  renderSelection(){
    let queen = `${this.props.colorSelect ? 'white' : 'black'}Queen`;
    let rook = `${this.props.colorSelect ? 'white' : 'black'}Rook`;
    let bishop = `${this.props.colorSelect ? 'white' : 'black'}Bishop`;
    let knight = `${this.props.colorSelect ? 'white' : 'black'}Knight`;
    if(this.props.selection){
      return (
        <div>
          <div className="vex-overlay"></div>
          <div className="vex vex-theme-default">
            <div className="vex-content">
              <p>Please select a promotion for your pawn</p>
              <table>
                <tbody>
                  <tr>
                    <td onClick={() => this.props.onPromoteClick(queen)} className={`tile ${queen}`}></td>
                    <td onClick={() => this.props.onPromoteClick(rook)} className={`tile ${rook}`}></td>
                    <td onClick={() => this.props.onPromoteClick(bishop)} className={`tile ${bishop}`}></td>
                    <td onClick={() => this.props.onPromoteClick(knight)} className={`tile ${knight}`}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    else{
      return '';
    }
  }
  render(){
    return (
      <div>
        {this.renderSelection()}
      </div>
    );
  }
}
