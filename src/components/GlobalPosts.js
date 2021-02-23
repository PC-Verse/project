import React, { Component } from 'react'
import '../App.css'
import Post from './Post'
import database from '../firebase'
import LazyLoad from "react-lazyload"
import PostPicture from './PostPicture'
import BlueLoadingBar from '../images/BlueLoadingBarSmaller.svg'
import appleLogo from '../images/appleLogo.svg'
import microsoftLogo from '../images/microsoftLogo.svg'
import nvidiaLogo from '../images/nvidiaLogo.svg'
// import SelectCommunity from './SelectCommunity'


const Spinner = () => (
    <div className = "loadingPost">
        {/* <h>loading...</h> */}
        <img id="loadingIcon" src={BlueLoadingBar} alt="Loading icon"/>
    </div>
);

class GlobalPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            globalPosts: [],
            LazyLoad: [],
            community:'Global'
        }
    }
    componentDidMount = () => {
        console.log("Running componentDidMount")
        database.ref('/globalPosts/').orderByChild("numLikes").on("value", (snapshot) => {
            snapshot.forEach(data => {

                console.log(this.props.community)
                let LazyLoadPost = {
                    postKey: data.key,
                    imageList: data.val().imageList,
                    title: data.val().title,
                    content:data.val().content,
                    dateDay:data.val().dateDay,
                    dateTime:data.val().dateTime,
                    isGlobalPost:data.val().isGlobalPost,
                    haveDiscussBtn:true,
                    name: data.val().name,
                    profileObj: data.val().profileObj,
                    numLikes:data.val().numLikes == undefined ? 0 : data.val().numLikes,
                    numViews: data.val().numViews == undefined ? 1 : data.val().numViews,
                    numSwipeRights : data.val().numSwipeRights == undefined ? 0 : data.val().numSwipeRights
                }
                
                if(this.props.community == 'Global' || 
                    data.val().community != undefined && data.val().community == this.props.community){
                    this.addGlobalPost(LazyLoadPost);
                }


            })
        })


    }



    addGlobalPost = (newPost) => {
        // console.log("ran setGlobalPosts")
        let posts = this.state.globalPosts;
        posts.unshift(newPost);  // concatenate newPosts to front of posts
        this.setState({
          globalPosts: posts
        })
        // console.log(this.state.globalPosts)
    }

    render = () => {
        return (
            <div>

                <div id="globalPostTitle">{this.props.community}</div>

                <div id = "communityswitch" className = "card">
                        <button onClick = {() => this.props.toggleComponent("showApple")}><img src={appleLogo} class="companyLogos"/></button>
                        <button onClick = {() => this.props.toggleComponent("showNvidia")}><img src={nvidiaLogo} class="companyLogos"/></button>
                        <button onClick = {() => this.props.toggleComponent("showAMD")}>AMD</button>
                        <button onClick = {() => this.props.toggleComponent("showMicrosoft")} ><img src={microsoftLogo} class="companyLogos"/></button>
                        <button onClick = {() => this.props.toggleComponent("showGlobalPosts")} >Global</button>
                </div>
                {
                this.state.globalPosts.map(post => {

                    return <LazyLoad        // these need to be on the same line as the return for some reason
                        height= {50}
                        offset = {[-150, 150]}
                        placeholder = {<Spinner/>}
                    >
                        <Post
                        content={post.content}
                        dateDay={post.dateDay}
                        dateTime={post.dateTime}
                        postKey={post.postKey}
                        isGlobalPost={post.isGlobalPost}
                        haveDiscussBtn={true}
                        // numLikes={data.val().numLikes}
                        name={post.name}
                        profileObj={post.profileObj}
                        title={post.title}
                        imageList={post.imageList}
                        toggleComponent = {this.props.toggleComponent}
                        numLikes = {post.numLikes}
                        setPostObj={this.props.setPostObj}
                        setPostKey={this.props.setPostKey}
                        numViews= {post.numViews}
                        numSwipeRights= {post.numSwipeRights}                        />
                    </LazyLoad>
                })}

            </div>
        )
    }
}

export default GlobalPosts