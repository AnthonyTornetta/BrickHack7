import './App.css';
import React from 'react';

import LandingPage from './LandingPage';
import SearchPage from './SearchPage';

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
      </ul>
    </div>
  );
}

export default HeaderBar;
