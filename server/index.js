const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyparser = require('body-parser');
const fs = require('fs');

app.use(bodyparser.json());
app.use(bodyparser.raw());
app.use(bodyparser.urlencoded({extended: false}));

app.listen(port, () =>
{
  console.log(`Listening on port ${port}.`);
});

class Tag
{
  constructor(name)
  {
    this.name = name.trim().toLowerCase();
  }

  isSame(s)
  {
    return this.name.toLowerCase() === s.toLowerCase().trim();
  }

  isSimilar(s)
  {
    return this.name.includes(s);
  }
}

class ChatRoom
{
  constructor(tagList, name)
  {
    this.name = name;
    this.tagList = tagList;
    this.users = 0;
  }
}

const rooms = [];

function saveRooms()
{
  fs.writeFile('rooms.json', JSON.stringify(rooms), () => {});
}

app.use((req, res, next) =>
{
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

if(fs.existsSync('rooms.json'))
{
  let data = fs.readFileSync('rooms.json', 'utf8');
  data = JSON.parse(data);

  data.forEach(r =>
  {
    let tags = [];

    r.tagList.forEach(t =>
    {
      tags.push(new Tag(t.name));
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

    if(req.body.name.length > 26)
    {
      res.status(400).type('json').send('{ "error": "Room name must have fewer than 27 characters!" }');
      return;
    }

    let tags = [];

    req.body.tags.forEach(tag =>
      {
        if(tag.length > 26)
        {
          res.status(400).type('json').send('{ "error": "Tag name must have fewer than 27 characters!" }');
          valid = false
          return;
        }
        tags.push(new Tag(tag));
      });

    if(!valid)
      return;

    rooms.push(new ChatRoom(tags, req.body.name));
    res.status(200).type('json').send('{ "success": "Room successfully created!" }');
    
    saveRooms();
  }
  else
  {
    res.status(400).type('json').send('{ "error": "Room must have a name and at least one tag!" }');
  }
});

app.post('/leave', (req, res, next) =>
{
  console.log('leaver');
  console.log(req.body);

  if(!req.body)
  {
    res.status(400).type('json').send(`{"error": "No body provided."}`);
    return;
  }

  for(let i = 0; i < rooms.length; i++)
  {
    let r = rooms[i];

    if(r.name === req.body.name)
    {
      r.users--;
      if(r.users < 0) // oops
        r.users = 0;
      res.status(200).type('json').send(`{"success": "Room count decreased"}`);
      return;
    }
  }

  res.status(400).type('json').send(`{"error": "No room with name ${req.body.name} exists."}`);
});

app.post('/join', (req, res, next) =>
{
  console.log('joiner');
  console.log(req.body);

  if(!req.body)
  {
    res.status(400).type('json').send(`{"error": "No body provided."}`);
    return;
  }

  for(let i = 0; i < rooms.length; i++)
  {
    let r = rooms[i];

    if(r.name === req.body.name)
    {
      r.users++;
      res.status(200).type('json').send(`{"success": "Room count increased"}`);
      return;
    }
  }

  res.status(400).type('json').send(`{"error": "No room with name ${req.body.name} exists."}`);
});

app.get('/alltags', (req, res, next) =>
{
  let tags = [];

  rooms.forEach(r =>
  {
    r.tagList.forEach(t =>
    {
      for(let i = 0; i < tags.length; i++)
      {
        if(t.isSame(tags[i]))
          return;
      }

      tags.push(t.name);
    });
  });

  res.status(200).type('json').send(JSON.stringify(tags));
});

app.post('/tags', (req, res, next) =>
{
  let goodRooms = [];

  if(req.body && req.body.length)
  {
    rooms.forEach(r =>
    {
      let removed = [];

      r.tagList.forEach(t =>
      {
        for(let i = 0; i < req.body.length; i++)
        {
          if(t.isSimilar(req.body[i]))
          {
            removed.push(req.body.splice(i,1));
            break;
          }
        }
      });

      if(req.body.length === 0)
      {
        goodRooms.push(r);
      }

      removed.forEach(t =>
      {
        req.body.push(t);
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

setInterval(() =>
{
  for(let i = 0; i < rooms.length; i++)
  {
    if(rooms[i].users <= 0)
    {
      rooms.splice(i, 1);
      i--;
    }
  }

  saveRooms();
}, 24 * 60 * 60 * 1000); // 24 hrs after server start