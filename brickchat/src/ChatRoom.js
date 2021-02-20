import './App.css';
import React from 'react';
import { Component, Fragment } from 'react';
import Canvas from './canvas';

import { reducer as voxeetReducer } from "@voxeet/react-components";
import thunkMidleware from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { ConferenceRoom, VoxeetProvider } from "@voxeet/react-components";
import "@voxeet/react-components/dist/voxeet-react-components.css";

const reducers = combineReducers({
  voxeet: voxeetReducer,
});

const configureStore = () =>
  createStore(reducers, applyMiddleware(thunkMidleware));

const settings = require('./secret.json');

class ChatRoom extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="ChatRoom">
      <VoxeetProvider store={configureStore()}>
        <ConferenceRoom
        autoJoin
        consumerKey={settings.consumerKey}
        consumerSecret={settings.consumerSecret}
        conferenceAlias={settings.conferenceAlias}
        />
      </VoxeetProvider>
      
      <Fragment>
              <h3 style={{ textAlign: 'center' }}>Brick Paint</h3>
              <div className="main">
                <div className="color-guide">
                  <h5>Color Guide</h5>
                  <div className="user user">User</div>
                  <div className="user guest">Guest</div>
                </div>
                <Canvas />
              </div>
        </Fragment>
      </div>
    );
  }
}

export default ChatRoom;
