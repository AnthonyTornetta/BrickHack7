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
        <h4 margin=20px>As the developers of this platform, we strive to have people unite together and be able to connect through a variety of means.  With the pandemic limiting in-person interactions, we want the best possible scenarios of communication and social life from our peers.  BrickChat was created to set a platform between students, having public chat rooms for different topics and subjects, so that anyone can talk about any topic they need with.  Whether it is to seek help via tutoring, or it is to have a chat for a certain game, BrickChat is here to help people connect from afar.</h4>
      </div>
    );
  }
}

export default AboutPage;
