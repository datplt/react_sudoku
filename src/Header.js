import React from 'react';

class Header extends React.Component {
    render() {
        return (<div className="header" onChange={this.props.selectLevel}>
            <p><b>Chose your level ?</b></p>
            <input type="radio" name="level" value="60"/> <b>Hard</b>
            <input type="radio" name="level" value="45"/> <b>Medium</b>
            <input type="radio" name="level" value="30"/> <b>Easy</b>
        </div>);
    }
}

export default Header;