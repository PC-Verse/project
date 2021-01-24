import React, { Component } from 'react';
import '../App.css'

class AddPost extends Component {

  constructor(props) {
    super(props);
    this.state = {content: '', title: ''};

    this.handleChangeInContent = this.handleChangeInContent.bind(this);
    this.handleChangeInTitle = this.handleChangeInTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }



    handleChangeInContent(event) {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit(event) {
        alert('Title: ' + this.state.title + ' Content: ' + this.state.content);
        event.preventDefault();
    }
    handleChangeInTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    render = () => {

        return(
            <div class = "card">

            <p>Your Post Here:</p>
                <form class = "container" onSubmit={this.handleSubmit} >
                    <div>
                        <span>Title: </span>
                        <input type="text" value={this.state.title} onChange={this.handleChangeInTitle} id="fname" className="title" placeholder="Your title.."></input>
                    </div>
                    <div>
                        <span>Content: </span>
                        <input type="text" value={this.state.content} onChange={this.handleChangeInContent} className="description" placeholder="Description..."></input>
                    </div>
                    <button class = "postBtn" onClick={() => {this.props.createPost(this.state.title, this.state.content)}}>Post!</button>
                </form>
             {/* </div><input type="text" id="fname" name="firstname" placeholder="Your name.."> */}
            </div>

            
        )
    }
}



export default AddPost