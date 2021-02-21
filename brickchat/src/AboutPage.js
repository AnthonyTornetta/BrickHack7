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
        <h1>About Brick Chat</h1>
        <br></br>
        <h4>
			Right now, it is harder than ever to meet with people 
			and make new friends. For many people in college, the 
			lack of social interaction is a sad bit of irony considering
			that so many of us are surrounded by thousands of people with 
			similar interests. All that considered, our goal is to provide 
			a platform that allows for easy communication between people with 
			similar interests. We believe that giving college students 
			a catalyst to ease the difficulty of making friends during the pandemic 
			will result in a happier, more connected student body. We hope 
			you enjoy using Brick Chat to connect in a way that 
			is more personal and targeted than anything else that is 
			currently available.
		</h4>
      </div>
    );
  }
}

export default AboutPage;
