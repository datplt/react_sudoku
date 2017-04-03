import React from 'react';
import Square from './Square';
class Row extends React.Component {
    constructor(){
        super();
        this.playGame = this.playGame.bind(this);
    }
    playGame(y,value){
        this.props.playGame(this.props.rowkey,y,value)
    }
    render() {
        var rows = [];
        for (var i = 0; i <= 8; i++) {
            let number = "";
            if (this.props.rows[i] !== 0) {
                number = this.props.rows[i];
            }
            rows.push(<Square key={i} disable={number!==""} rowkey={i} number={number} playGame={this.playGame}  />);
        }
        return (<div>{rows}</div>);
    }
}
export default Row;