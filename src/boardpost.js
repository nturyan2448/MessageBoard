import React from 'react';
import BoardReply from './boardreply'

class BoardPost extends React.Component{
    constructor(props){
        super(props);
        //props: name, post, time, replies, id
        this.state = { replies: this.props.replies, currentUser: "", currentReply: ""}

        this.handleReplySubmit = this.handleReplySubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleReplyChange = this.handleReplyChange.bind(this);
    }

    handleReplySubmit(e){
        e.preventDefault();
        if (this.state.currentUser === "" || this.state.currentReply === ""){
            alert("User name and post should not be empty")
            return;
        }
        fetch('/api/reply', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId: this.props.id,
                id: this.props.id + '-' + this.state.replies.length,
                name: this.state.currentUser,
                reply: this.state.currentReply,
                time: this.props.TP(new Date())
            })
        })
        .then(res => res.json())
        .then(data => this.setState({replies: data}))
        .catch(err => console.log(err));
        // this.state.replies.push({name: this.state.currentUser, reply: this.state.currentReply, time: this.props.TP(new Date())})
        this.setState({currentReply: ""})
    }
    handleNameChange(e){
        this.setState({currentUser: e.target.value});
    }
    handleReplyChange(e){
        this.setState({currentReply: e.target.value})
    }
    render(){
        let renderReply = this.state.replies.map((x,index) => {return <BoardReply key={index} name={x.name} reply={x.reply} time={x.time}/>})
        return(
            <div className="PostBlock">
                <div className="Post">
                    <h2>{this.props.name}</h2>
                    <pre>{this.props.post} <span>{this.props.time}</span></pre>
                    <form onSubmit={this.handleReplySubmit}>
                        <input type="text" placeholder="User name" value={this.state.currentUser} onChange={this.handleNameChange}/>
                        <input type="text" placeholder="Reply the post" value={this.state.currentReply} onChange={this.handleReplyChange}/>
                        <button onClick={this.handleReplySubmit}>Reply</button>
                    </form>
                </div>
                {renderReply}
            </div>
        )
    }
}

export default BoardPost