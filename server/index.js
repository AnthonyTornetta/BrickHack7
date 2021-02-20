console.log('Really cool server');

class Tag
{
  constructor(name)
  {
    this.name = name;
  }

  isSimilar(s)
  {
    return this.name.includes(s);
  }
}


class ChatRoom
{
  constructor(nameList)
  {
    this.nameList = nameList;
  }
}
