import React, { Component } from 'react';
import '../App.css'
import appleLogo from '../images/appleLogo.svg'
import microsoftLogo from '../images/microsoftLogo.svg'
import nvidiaLogo from '../images/nvidiaLogo.svg'

class SelectCommunity extends Component {

  constructor(props) {
    super(props);
    this.state = {
        content: '',
    };
  }


    render = () => {
        return(
            <div>

                
                 <div id = "communityswitch" className = "card">
                        <button onClick = {()=> this.props.toggleCommuity("Apple")}><img src={appleLogo} class="companyLogos"/></button>
                        <button onClick = {()=> this.props.toggleCommuity("Nvidia")}><img src={nvidiaLogo} class="companyLogos"/></button>
                        <button onClick = {()=> this.props.toggleCommuity("AMD")}>AMD</button>
                        <button onClick = {()=> this.props.toggleCommuity("Microsoft")} ><img src={microsoftLogo} class="companyLogos"/></button>
                </div>
                
            </div>
        )
    }
}



export default SelectCommunity