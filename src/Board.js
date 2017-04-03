import React from 'react';
import Row from './Row';

class Board extends React.Component {
    render() {
        var rows = [];
        for (var i = 0; i < 9; i++) {
            rows.push(<Row key={i} rowkey={i} rows={this.props.game[i]} playGame={this.props.playGame} />);
        }
        return (<div className="board">{rows}</div>);
    }
}

export default Board;