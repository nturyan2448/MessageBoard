import React from 'react';

class BoardReply extends React.Component{
    render(){
        return(
            <div className="Reply">
                <h3>{this.props.name}</h3>
                <p>{this.props.reply}<span> {this.props.time}</span></p>
            </div>
        )
    }
}

export default BoardReply