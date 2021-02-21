const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyparser = require('body-parser');
const fs = require('fs');

app.use(bodyparser.json());
app.use(bodyparser.raw());
// app.use(express.static(path.join(__dirname, '../brickchat'))

app.listen(port, () =>
{
  console.log(`Listening on port ${port}.`);
});

class Tag
{
  constructor(name){this.name = name;}
  isSimilar(s){return this.name.includes(s);}
}

class ChatRoom
{
  constructor(tagList, name)
  {
    this.name = name;
    this.tagList = tagList;
  }
}

const rooms = [];

function saveRooms()
{
  fs.writeFile('rooms.json', JSON.stringify(rooms), () => {});
}

if(fs.existsSync('rooms.json'))
{
  let data = fs.readFileSync('rooms.json', 'utf8');
  data = JSON.parse(data);

  data.forEach(r =>
  {
    let tags = [];

    r.tagList.forEach(t =>
    {
      tags.push(new Tag(t));
    });
    
    rooms.push(new ChatRoom(tags, r.name));
  });
}
else
  saveRooms();

app.post('/makeroom', (req, res, next) =>
{
  if(req.body && req.body.tags && req.body.tags.length && req.body.name)
  {
    let name = req.body.name.trim();

    let valid = true;
    rooms.forEach(r =>
      {
        if(r.name.toLowerCase() === name.toLowerCase())
        {
          res.status(400).type('json').send('{ "error": "Room name already taken!" }');
          valid = false;
          return;
        }
      });

    if(!valid)
      return;

    rooms.push(new ChatRoom(req.body.tags, req.body.name));
    res.status(200).type('json').send('{ "success": "Room successfully created!" }');
    
    saveRooms();
  }
  else
  {
    res.status(400).type('json').send('{ "error": "Room must have a name and at least one tag!" }');
  }
});

app.post('/tags', (req, res, next) =>
{
  let goodRooms = [];

  if(req.body && req.body.tags && req.body.tags.length)
  {
    rooms.forEach(r =>
    {
      let removed = [];

      r.tagList.forEach(t =>
      {
        for(let i = 0; i < req.body.tags.length; i++)
        {
          if(t.isSimilar(req.body.tags[i]))
          {
            removed.push(req.body.tags.splice(i,1));
            break;
          }
        }
      });

      if(req.body.tags.length === 0)
      {
        goodRooms.push(r);
      }

      removed.forEach(t =>
      {
        req.body.tags.push(t);
      });
    });
  }
  else
  {
    goodRooms = rooms;
  }

  let names = [];

  goodRooms.forEach(r =>
  {
    names.push(r.name);
  });

  res.status(200).type('json').send(JSON.stringify(names));
});
