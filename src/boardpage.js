import React from 'react';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import BoardPost from './boardpost';

class BoardPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {user: "", content: "", posts: []};
        
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handlePostSubmit = this.handlePostSubmit.bind(this);
        this.handlePostNameChange = this.handlePostNameChange.bind(this);
    }
    
    componentDidMount(){
        fetch('/api/comments')
            .then(res => res.json())
            .then(data => this.setState({posts: data}))
            .catch(err => console.log(err));
    }

    timeParser(time){
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        let date = time.getDate();
        let hour = (time.getHours() < 10) ? '0'+ time.getHours() : time.getHours();
        let min = (time.getMinutes() < 10) ? '0'+ time.getMinutes() : time.getMinutes();
        let sec = (time.getSeconds() < 10) ? '0'+ time.getSeconds() : time.getSeconds();
        return `${year}/${month}/${date} ${hour}:${min}:${sec}`
    }

    handlePostChange(e){
        this.setState({content: e.target.value})
    }
    handlePostSubmit(e){
        e.preventDefault();
        if (this.state.user === "" || this.state.content === ""){
            alert("User name and post should not be empty")
            return;
        }
        // this.state.posts.push({name: this.state.user, post: this.state.content, time: new Date()})
        fetch('/api/comments', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.user,
                post: this.state.content,
                time: this.timeParser(new Date())
            })
        })
        .then(res => res.json())
        .then(data => this.setState({posts: data}))
        .catch(err => console.log(err));
        console.log(this.state.posts)
        // this.setState({posts: this.state.posts, content: ""})
        this.setState({content: ""})
    }
    handlePostNameChange(e){
        this.setState({user: e.target.value})
    }
    render(){
        let renderPost = this.state.posts.map((x,index) => <BoardPost id={x.id} TP={this.timeParser} key={index} name={x.name} post={x.post} time={x.time} replies={x.replies}/>)
        return(
            <div>
                <div className="Header">
                    <h1>Message Board</h1>
                    <input type="text" value={this.state.user} placeholder="User name" onChange={this.handlePostNameChange} />
                    <textarea placeholder="Leave a post" rows="6" cols="40" 
                            value={this.state.content} onChange={this.handlePostChange}/>
                    <button onClick={this.handlePostSubmit}>Post</button>
                </div>
                {renderPost.reverse()}
            </div>
        )
    }
}

export default BoardPage