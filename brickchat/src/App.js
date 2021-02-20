import logo from './logo.svg';
import './App.css';
import React from 'react';

import { reducer as voxeetReducer } from "@voxeet/react-components"
import thunkMidleware from "redux-thunk"
import { combineReducers, createStore, applyMiddleware } from "redux"
import { ConferenceRoom, VoxeetProvider } from "@voxeet/react-components"
import "@voxeet/react-components/dist/voxeet-react-components.css"

const reducers = combineReducers({
  voxeet: voxeetReducer,
})

const configureStore = () =>
  createStore(reducers, applyMiddleware(thunkMidleware))

const settings = require('secret.json');

function App() {
  return (
    <div className="App">
		<VoxeetProvider store={configureStore()}>
			<ConferenceRoom
			autoJoin
			consumerKey={settings.consumerKey}
			consumerSecret={settings.consumerSecret}
			conferenceAlias={settings.conferenceAlias}
			/>
		</VoxeetProvider>
		
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

  );
}

export default App;
