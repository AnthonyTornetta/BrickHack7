import './App.css';
import React, { Component } from 'react';

import 'materialize-css';
import { Button, Card, Row, Col } from 'react-materialize';

class LandingPage extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="LandingPage">
        <h1>This is the landing page!</h1>
      </div>
    );
  }
}

export default LandingPage;
