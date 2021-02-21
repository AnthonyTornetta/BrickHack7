import './App.css';
import React, { Component } from 'react';
import ChatRoom from './ChatRoom';

class SearchRoom extends Component
{
  constructor(props)
  {
    super(props);

    this.state = { tags: [], selectedTags: [], groups: [] };
    this.allTags = [];
  }

  componentDidMount()
  {
    fetch('http://localhost:8080/alltags/', {method: 'GET'})
    .then(res => res.json().then(res =>
    {
      this.allTags = res;
      this.setState({tags: res, selectedTags: this.state.selectedTags, groups: this.state.groups});
      this.enteredValue = '';
    }));

    this.updateChatRooms();
  }

  updateChatRooms()
  {
    fetch('http://127.0.0.1:8080/tags', 
    {
      method: 'POST',
      body: JSON.stringify(this.state.selectedTags),
      headers:
      {
        'Content-Type': 'application/json'
      }
    }).then(res =>
    {
      res.json().then(res =>
        {
          this.setState({tags: this.state.tags, selectedTags: this.state.selectedTags, groups: res});
        });
    });
  }

  addTag(toAdd)
  {
    let newSelectedTags = [];
    for(let i = 0; i < this.state.selectedTags.length; i++)
    {
      newSelectedTags[i] = this.state.selectedTags[i];
      if(this.state.selectedTags[i] === toAdd)
        toAdd = undefined;
    }

    if(toAdd)
      newSelectedTags.push(toAdd);

    this.setState({tags: this.state.tags, selectedTags: newSelectedTags, groups: this.state.groups}, () =>
    {
      this.updateChatRooms();
    });
  }

  removeTag(toRemove)
  {
    let newSelectedTags = [];
    for(let i = 0; i < this.state.selectedTags.length; i++)
    {
      if(this.state.selectedTags[i] !== toRemove)
        newSelectedTags.push(this.state.selectedTags[i]);
    }

    this.setState({tags: this.state.tags, selectedTags: newSelectedTags, groups: this.state.groups}, () =>
    {
      this.updateChatRooms();
    });
  }

  makeGroup()
  {
    let name = prompt('Chat name');

    fetch('http://127.0.0.1:8080/makeroom/',
    {
      method: 'POST',
      body: JSON.stringify({name: name, tags: this.state.selectedTags}),
      headers:
      {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json().then(res =>
    {
      if(res.success)
      {
        alert(res.success);
        
        this.updateChatRooms();
      }
      else
      {
        alert(res.error);
      }
    }));
  }

  render()
  {
    return (
      <div className="SearchRoom">
        <div id="searchBar">
          <div style={{textAlign: 'center', marginBottom: 20}}>
            <h1 style={{marginBottom: 20, fontSize: "3.5em"}}>Search Your Interests</h1>
            <input name="search" placeholder="Search for tag..." onChange={(event) =>
            {
              let showTags = [];
              let val = event.target.value.toLowerCase().trim();
              this.enteredValue = val;

              this.allTags.forEach(t =>
              {
                if(t.includes(val))
                  showTags.push(t);
              });

              this.setState({tags: showTags, selectedTags: this.state.selectedTags, groups: this.state.groups});
            }}></input>
            <button style={{height: 54, marginLeft: 6}}>Search</button>
          </div>
        </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div className="Left">
              <h2>Tags</h2>
              <ul className="TagList">
                {
                  this.state.tags.length > 0 ?
                    this.state.tags.map(tag => (<li onClick={() =>
                    {
                      this.addTag(tag);
                    }} className="Tag" id={`tag-${tag}`}>{tag}</li>))
                    :
                    <button className="AddTag" onClick={() =>
                    {
                      this.addTag(this.enteredValue);
                    }}>Create Tag</button>
                }
              </ul>
              <h2 style={{marginTop: 40}}>Search For...</h2>
              <ul className="TagList">
                {
                  this.state.selectedTags.map(tag => (<li onClick={() =>
                  {
                    this.removeTag(tag);
                  }} className="Tag" id={`selected-tag-${tag}`}>{tag}</li>))
                }
              </ul>
            </div>
            <div className="Right">
              <h2>Applicable Groups</h2>
              <ul className="GroupList">
                {
                  this.state.groups.length ?
                  this.state.groups.map(group => (<li onClick={() =>
                  {
                    this.props.main.changePage(<ChatRoom name={group} />);
                  }} className="Group" id={`group-${group}`}>{group}</li>))
                  : <button className='CreateOwnGroupButton' onClick={() => {this.makeGroup()}}>Create your own chat</button>
                }
              </ul>
            </div>
        </div>
      </div>
    );
  }
}

export default SearchRoom;
