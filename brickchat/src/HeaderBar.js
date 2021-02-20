import './App.css';
import React from 'react';

import LandingPage from './LandingPage';
import SearchPage from './SearchPage';
import ChatRoom from './ChatRoom';
import AboutPage from './AboutPage';

function HeaderBar(props) {
  return (
    <div className="HeaderBar">
      <ul>
        <li onClick={() =>
        {
          props.main.changePage( (<LandingPage />) );
        }}>
          Home
        </li>

        <li onClick={() =>
        {
          props.main.changePage( (<SearchPage />) );
        }}>
          Search
        </li>

        <li onClick={() =>
        {
          props.main.changePage( (<AboutPage />) );
        }}>
          About
        </li>

        <li onClick={() =>
        {
          props.main.changePage( (<ChatRoom />) );
        }}>
          Chat
        </li>
      </ul>
    </div>
  );
}

export default HeaderBar;
