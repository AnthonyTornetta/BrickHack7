import './App.css';
import './fonts.css';
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
        <h1>RIT BrickChat</h1>
        <h2>Roar With Your Tigers!</h2>
        <button onClick={() =>
          {
            this.props.main.changePage( (<SearchPage main={this.props.main} />) );
          }}>
            Search Chatrooms
        </button>
      </div>
    );
  }
}

export default LandingPage;
