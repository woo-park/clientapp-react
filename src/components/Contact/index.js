import React, { Component } from 'react';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Woo Park',
      phoneNumber: '+82 10 7540 1138',
      email: 'wp503@nyu.edu',
      instagram: '',
      portrait: '/assets/images/sample4.jpeg'
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
