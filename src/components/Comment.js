import React, { Component } from 'react';
import '../App.css'



class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animationClass : ''
    }
  }

  removeComment = (commentKey) => {
    this.setState({
      animationClass : "exitCard"
    })
    setTimeout(() => {
      this.setState({
        animationClass : ""
      })
      this.props.removeComment(commentKey);
    }, 1000)
  }

  render = () => {
    let commentClasses = ['postCard', this.state.animationClass].join(' ');
    return (
      <div>
        <div id="commentBox" className={commentClasses}>
          {
            this.props.commentObj.profileObj &&
            <div id="nameOfPoster">{this.props.commentObj.profileObj.name}</div>
          }
          <div className="timeStamp">{this.props.commentObj.dateDay} {this.props.commentObj.dateTime}</div>
          <p>{this.props.commentObj.content}</p>
          {this.props.commentObj.profileObj &&
            this.props.commentObj.profileObj.googleId == this.props.currentProfileObj.googleId && this.props.commentObj.profileObj.googleId != -1 && // checking if the person who comemnted and who is signed in is the same
            <button id="rmvBtn" onClick={() => { this.removeComment(this.props.commentObj.commentKey)} }>Remove</button>
          }
        </div>
      </div>
    )
  }
}



export default Comment