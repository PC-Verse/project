import React, { Component } from 'react';
import '../App.css'
import SelectCommunity from './SelectCommunity'
import Picture from './Picture'
import PostPicture from './PostPicture'
import ImageUploading from 'react-images-uploading';


class AddPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
        content: '',
        title: '',
        showAddPost: true,
        images: [],
        community: 'Microsoft',
        animationExit : ""
    };

    this.handleChangeInContent = this.handleChangeInContent.bind(this);
    this.handleChangeInTitle = this.handleChangeInTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setImages = this.setImages.bind(this);
    this.toggleCard = this.toggleCard.bind(this);
    this.toggleCommunity = this.toggleCommunity.bind(this);

  }

  setImages(imageList){
    this.setState({
        images: imageList
    })
  }

    hideComponent(name) {
        console.log(name);
        switch (name) {
        case "showAddPost":
            break;
        }
    }
    toggleCard(){
        if (this.state.showAddPost == true) {
            this.setState({
                animationExit : "exitCard"
            })
            setTimeout(() => {
                this.setState({
                    animationExit : "",
                    showAddPost: !this.state.showAddPost
                })
            }, 1000)
        }
        else 
            this.setState({showAddPost: !this.state.showAddPost})
    }
    toggleCommunity(name){
        this.setState({community: name})
    }

    handleChangeInContent(event) {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit(event) {
        // alert('Title: ' + this.state.title + ' Content: ' + this.state.content);
        event.preventDefault();
        this.hideComponent("showAddPost")
    }
    handleChangeInTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    render = () => {
        let addPostCardClasses = ['card', this.state.animationExit].join(' ');
        return(
            <div>
                <button className = "Posting-Button" onClick={() => this.toggleCard()}>
                        Click to Post or Hide Form!
                </button>


                {  this.state.showAddPost && 
                    <div className ={addPostCardClasses}>
                            
                            <SelectCommunity toggleCommuity = {this.toggleCommunity} ></SelectCommunity>
                            <form className = "container" onSubmit={this.handleSubmit} >
                            <div>

                                <p>Your Post Here:</p>
                                <p>Posting to {this.state.community} Community</p>
                                <span>Title: </span>
                                <input type="text"  onChange={this.handleChangeInTitle} id="fname" className="title" placeholder="Your title..">
                                    {/* {this.props.shouldClear && this.state.title} */}
                                </input>
                            </div>
                            <div>
                                <span>Content: </span>
                                <input type="text"  onChange={this.handleChangeInContent} className="description" placeholder="Description..."></input>
                                
                            </div>

                            <PostPicture setImages = {this.setImages}/>

                            <button className = "postBtn" onClick={() => {this.props.createPost(this.state.title, this.state.content, this.state.images, this.state.community)}}>Post!</button>
                        </form>
                    {/* </div><input type="text" id="fname" name="firstname" placeholder="Your name.."> */}
                    </div>
                }
            </div>
        )
    }
}



export default AddPost