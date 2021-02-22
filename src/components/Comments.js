import React, { Component } from 'react';
import '../App.css'



class Comments extends Component {

  constructor(props) {
    super(props);

  }


  render = () => {
    return (
      <div>
        <div id="commentBox" className="card">
          {
            this.props.commentObj.profileObj &&
            <div id="nameOfPoster">{this.props.commentObj.profileObj.name}</div>
          }
          <div className="timeStamp">{this.props.commentObj.dateDay} {this.props.commentObj.dateTime}</div>
          <p>{this.props.commentObj.content}</p>
          {this.props.commentObj.profileObj &&
            this.props.commentObj.profileObj.googleId == this.props.currentProfileObj.googleId && this.props.commentObj.profileObj.googleId != -1 && // checking if the person who comemnted and who is signed in is the same
            <button id="rmvBtn" onClick={() => { this.props.removeComment(this.props.commentObj.commentKey) }}>Remove</button>
          }
        </div>
      </div>
    )
  }
}



export default Comments