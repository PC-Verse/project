import React, { Component } from 'react';
import '../App.css'

class AddPost extends Component{

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render = () => {

        return(
            <div class = "card">

            <p>Your Post Here:</p>
                <form class = "container" onSubmit={this.handleSubmit} >
                    <div>
                        <input type="text" id="fname" class="title" placeholder="Your title.."></input>
                    </div>
                    <div>
                        <input type="text" value={this.state.value} onChange={this.handleChange} class="description" placeholder="Description..."></input>
                    </div>
                    <button class = "post">Post!</button>
                </form>
             {/* </div><input type="text" id="fname" name="firstname" placeholder="Your name.."> */}
            </div>

            
        )
    }
}



export default AddPost