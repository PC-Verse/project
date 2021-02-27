import React, { Component } from 'react';
import '../App.css'
import appleLogo from '../images/appleLogo.png'
import microsoftLogo from '../images/microsoftLogo2.svg'
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

                
                 <div id = "communityswitch1" className = "card">
                        <button id="btnSwitch" onClick = {()=> this.props.toggleCommuity("Apple")}><img src={appleLogo} className="companyLogos"/></button>
                        <button id="btnSwitch" onClick = {()=> this.props.toggleCommuity("Nvidia")}><img src={nvidiaLogo} className="companyLogos"/></button>
                        <button id="btnSwitch" onClick = {()=> this.props.toggleCommuity("AMD")} ><img src={amdLogo} className="companyLogos"/></button>
                        <button id="btnSwitch" onClick = {()=> this.props.toggleCommuity("Microsoft")} ><img src={microsoftLogo} className="companyLogos"/></button>
                        <button id="btnSwitch" onClick = {()=> this.props.toggleCommuity("Intel")} ><img src={intelLogo} className="companyLogos"/></button>
                        <button id="btnSwitch" onClick = {()=> this.props.toggleCommuity("HP")} ><img src={hpLogo} className="companyLogos"/></button>
                </div>
                
            </div>
        )
    }
}



export default SelectCommunity