import React, { Component } from 'react';
import '../App.css'
import Picture from './Picture'
import PostPicture from './PostPicture'
import ImageUploading from 'react-images-uploading';


class AddComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
        content: '',
    };

    this.handleChangeInContent = this.handleChangeInContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


    handleChangeInContent(event) {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
    }


    render = () => {
        return(
            <div>

                
                 <div className = "card">
                        <form className = "container" onSubmit={this.handleSubmit} >
                            <div>
                                <span>Leave a comment: </span>
                                <input type="text"  onChange={this.handleChangeInContent} className="description" placeholder="comment..."></input>
                            </div>

                            <button className = "postBtn" onClick={() => {this.props.createPost(this.state.content)}}>Post!</button>
                        </form>
                    {/* </div><input type="text" id="fname" name="firstname" placeholder="Your name.."> */}
                </div>
                
            </div>
        )
    }
}



export default AddComment