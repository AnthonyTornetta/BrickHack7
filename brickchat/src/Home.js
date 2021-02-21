import './App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import HeaderBar from './HeaderBar';
import LandingPage from './LandingPage';

class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            currentPage: (<LandingPage main={this}/>) 
        };
    }

    changePage = (p) => 
    {
        this.setState({
            currentPage: p
        });
    }

    render()
    {
        return (
            <div className="Container">
                <HeaderBar main={this} />

                <div id="CurrentPage">
                    {this.state.currentPage}
                </div>
            </div>
        );
    }
}

export default App;
