import React, { Component } from 'react';
import '../App.css'
import appleLogo from '../images/appleLogo.svg'
import microsoftLogo from '../images/microsoftLogo.svg'
import hpLogo from '../images/hp.png'
import intelLogo from '../images/intel.png'
import nvidiaLogo from '../images/nvidiaLogo.svg'
import amdLogo from  '../images/amd.png'

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
                        <button onClick = {()=> this.props.toggleCommuity("AMD")} ><img src={amdLogo} class="companyLogos"/></button>
                        <button onClick = {()=> this.props.toggleCommuity("Microsoft")} ><img src={microsoftLogo} class="companyLogos"/></button>
                        <button onClick = {()=> this.props.toggleCommuity("Intel")} ><img src={intelLogo} class="companyLogos"/></button>
                        <button onClick = {()=> this.props.toggleCommuity("HP")} ><img src={hpLogo} class="companyLogos"/></button>
                </div>
                
            </div>
        )
    }
}



export default SelectCommunity