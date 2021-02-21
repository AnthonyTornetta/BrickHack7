import './App.css';
import React, { Component } from 'react';

import 'materialize-css';
import { Button, Card, Row, Col } from 'react-materialize';

import SearchPage from './SearchPage';

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
        <h1>RIT Chatrooms</h1>
        
        <button onClick={() =>
          {
            this.props.main.changePage( (<SearchPage />) );
          }}>
            Search Chatrooms
          </button>
      </div>
    );
  }
}

export default LandingPage;
