import './App.css';
import React, { Component } from 'react';

class SearchRoom extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="SearchRoom">
        <div id="searchBar">
          <div>
            <input name="search" placeholder="search for a room..."></input>
            <button>Search</button>
          </div>
          <div>

          </div>
        </div>
      </div>
    );
  }
}

export default SearchRoom;
