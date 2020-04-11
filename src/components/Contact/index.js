import React, { Component } from 'react';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Jane Park',
      phoneNumber: '+1 310 464 7687',
      email: 'janeparkart@gmail.com',
      instagram: '',
      portrait: '/assets/images/portrait.jpg'
    }
  }

  render () {
    return(
      <div className="component">

        <div className="contactSections">
          <img className="contactPortrait" src={this.state.portrait}></img>
          </div>
          <div className="contactSections">

            <div>{this.state.name}</div>
            <div>{this.state.phoneNumber}</div>
            <div>{this.state.email}</div>
            <div><a href={this.state.instagram}>Instagram</a></div>

          </div>

        

      </div>
    )
  }
}

export default Contact
