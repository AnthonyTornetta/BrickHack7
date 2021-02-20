import './App.css';
import React, { Component } from 'react';

class AboutPage extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="AboutPage">
        <h1>About Us!</h1>
        <br></br>
        <h4>We exist to help out your mother!</h4>
      </div>
    );
  }
}

export default AboutPage;
