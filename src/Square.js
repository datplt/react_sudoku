import React from 'react';

class Square extends React.Component{    
    updateOnChange(e){
        console.log('value of square',e.target.value);
        this.props.playGame(this.props.rowkey,e.target.value)
    }
    render(){
        return(
            <input className="square" type="input" disabled={this.props.disable} value={this.props.number} onChange={this.updateOnChange.bind(this)}/>
        );
    }
}    

export default Square;