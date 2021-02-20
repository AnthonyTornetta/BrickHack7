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
        <label for="search">Search Bar epico</label>
        <input name="search"></input>
      </div>
    );
  }
}

export default SearchRoom;
