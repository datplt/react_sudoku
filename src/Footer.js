import React from 'react';

class Footer extends React.Component {
    render() {
        return (<div className="footer">
            <h3>{this.props.result}</h3>
        </div>);
    }
}

export default Footer;