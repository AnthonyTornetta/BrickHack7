import './App.css';
import React, { Component } from 'react';

import LandingPage from './LandingPage';
import SearchPage from './SearchPage';
import ChatRoom from './ChatRoom';
import AboutPage from './AboutPage';

class HeaderBar extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="HeaderBar">
        <ul>
          <li onClick={() =>
          {
            this.props.main.changePage( (<LandingPage main={this.props.main} />) );
          }}>
            Home
          </li>

          <li onClick={() =>
          {
            this.props.main.changePage( (<SearchPage />) );
          }}>
            Search
          </li>

          <li onClick={() =>
          {
            this.props.main.changePage( (<AboutPage />) );
          }}>
            About
          </li>

          <li onClick={() =>
          {
            this.props.main.changePage( (<ChatRoom />) );
          }}>
            Chat
          </li>
        </ul>
      </div>
    );
  }
}

export default HeaderBar;
