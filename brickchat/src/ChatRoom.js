import './App.css';
import React from 'react';

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

function ChatRoom() {
  return (
    <div className="ChatRoom">
      <VoxeetProvider store={configureStore()}>
        <ConferenceRoom
        autoJoin
        displayActions={["mute", "screenshare", "video", "chat", "attendies"]}
        liveRecordingEnabled={false}
        consumerKey={settings.consumerKey}
        consumerSecret={settings.consumerSecret}
        conferenceAlias={'ROOM CONFERENCE - CHANGE BASED ON TITLE'}
        />
      </VoxeetProvider>
		
      <div className="ChatRoomMain">
        
      </div>
    </div>

  );
}

export default ChatRoom;
