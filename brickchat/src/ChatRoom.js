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

    this.componentCleanup = this.componentCleanup.bind(this);
    window.addEventListener('beforeunload', this.componentCleanup);
  }

  componentDidMount()
  {
    console.log('a');

    fetch('http://127.0.0.1:8080/join', 
    {
      method: 'POST',
      body: `{ "name": "${this.props.name}" }`,
      headers:
      {
        'Content-Type': 'application/json'
      }
    });
  }

  componentCleanup()
  {
    fetch('http://127.0.0.1:8080/leave', 
    {
      method: 'POST',
      body: `{ "name": "${this.props.name}" }`,
      headers:
      {
        'Content-Type': 'application/json'
      }
    }).then(res =>
    {
      window.location = '/';
    });
  }

  componentWillUnmount()
  {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
  }

  render()
  {
    return (
      <div className="ChatRoom">
        <VoxeetProvider store={configureStore()}>
          <ConferenceRoom
            autoJoin
            handleOnLeave={() => 
            {
                this.componentCleanup();
            }}
            displayActions={["mute", "video", "screenshare"]}
            liveRecordingEnabled={false}
            consumerKey={settings.consumerKey}
            consumerSecret={settings.consumerSecret}
            conferenceAlias={`settings.conferenceAlias-${this.props.name}`}
          />
        </VoxeetProvider>

        <Fragment>
          <h1 style={{ textAlign: 'center' }}>{this.props.name}</h1>
          <div className="main">
            <div className="color-guide">
              <h5>Color Guide</h5>
              <div className="user user">You</div>
              <div className="user guest">Others</div>
            </div>

            <Canvas chatname={this.props.name} />
          </div>
          </Fragment>
      </div>
    );
  }
}

export default ChatRoom;
