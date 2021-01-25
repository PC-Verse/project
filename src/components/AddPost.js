import React, { Component } from 'react';
import '../App.css'

class AddPost extends Component {

  constructor(props) {
    super(props);
    this.state = {content: '', title: '', showPost: false};

    this.handleChangeInContent = this.handleChangeInContent.bind(this);
    this.handleChangeInTitle = this.handleChangeInTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    hideComponent(name) {
        console.log(name);
        switch (name) {
        case "showPost":
            this.props.hideCard();
            break;
        }
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
            <div>
                <button class = "Posting-Button" onClick={() => this.hideComponent("showPost")}>
                        Click to Post or Hide Form!
                </button>
                {   this.props.showPost &&
                <div class = "card">
                    

                        <form class = "container" onSubmit={this.handleSubmit} >
                        <div>
                            <p>Your Post Here:</p>
                            <span>Title: </span>
                            <input type="text"  onChange={this.handleChangeInTitle} id="fname" className="title" placeholder="Your title..">
                                {/* {this.props.shouldClear && this.state.title} */}
                            </input>
                        </div>
                        <div>
                            <span>Content: </span>
                            <input type="text"  onChange={this.handleChangeInContent} className="description" placeholder="Description..."></input>
                        </div>
                        <button class = "postBtn" onClick={() => {this.props.createPost(this.state.title, this.state.content)}}>Post!</button>
                    </form>
                {/* </div><input type="text" id="fname" name="firstname" placeholder="Your name.."> */}
                </div>}
            </div>
        )
    }
}



export default AddPost