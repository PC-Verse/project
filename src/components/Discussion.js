import React, { Component } from 'react'
import '../App.css'

class Discussion extends Component {
   
    //will pass the string list as a prop through the database
    render = () => {
        console.log("showing di");

        return (
        
            <div className = "Discussion">
                <div className = "card">
                    <p class = "text-card">
                        <div className="postTitle">Test</div>
                    </p>
                    <br/>

                </div>
            </div>

        )
    }
}



export default Discussion