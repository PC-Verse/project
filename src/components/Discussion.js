import React, { Component } from 'react'
import '../App.css'
import Post from './Post'

class Discussion extends Component {
    constructor(props) {
        super(props)
    }
    
    //will pass the string list as a prop through the database
    render = () => {
        console.log("showing di");

        return (
        
            <div className = "Discussion">
                <Post
                    content={this.props.postObj.content}
                    dateDay={this.props.postObj.dateDay}
                    dateTime={this.props.postObj.dateTime}
                    key={this.props.postObj.key}
                    isGlobalPost={this.props.postObj.isGlobalPost}
                    haveDiscussBtn={this.props.postObj.haveDiscussBtn}
                    name={this.props.postObj.name}
                    title={this.props.postObj.title}
                    imageList={this.props.postObj.imageList}
                    toggleComponent = {this.props.toggleComponent}
                />
                {/* <div className = "card">
                    <p class = "text-card">
                        <div className="postTitle">Test</div>
                    </p>
                    <br/>

                </div> */}
            </div>

        )
    }
}



export default Discussion