const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  feed: [
    {
      _id: "1",
      userId: "user-1",
      status: "This is an example status. Isn't it great?!",
      publishedAt: "2019-09-12T15:52:01.169Z",
      parentStatusId: null
    },
    {
      _id: "t-1",
      userId: "user-1",
      status:
        "This is an example response, which is really just a status with a parent. Isn't it great?!",
      publishedAt: "2019-09-12T15:52:01.169Z",
      parentStatusId: "1"
    }
  ],
  users: [
    {
      _id: "user-1",
      avatarUri: "https://picsum.photos/id/237/200",
      name: "Jane Doe",
      username: "@jane_doe"
    },
    {
      _id: "user-2",
      avatarUri: "https://picsum.photos/id/238/200",
      name: "John Doe",
      username: "@john_doe"
    }
  ],
  likes: {}
}).write();

module.exports = db;
