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

    this.chatComponent = (<ConferenceRoom
        autoJoin
        consumerKey={settings.consumerKey}
        consumerSecret={settings.consumerSecret}
        conferenceAlias={settings.conferenceAlias}
      />);
  }

  render()
  {
    return (
      <div className="ChatRoom">
        <VoxeetProvider store={configureStore()}>
          {this.chatComponent}
        </VoxeetProvider>

        <Fragment>
                <h3 style={{ textAlign: 'center' }}>Dos Paint</h3>
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

  componentWillUnmount()
  {
    document.getElementById('leave-btn').click();
  }
}

export default ChatRoom;
