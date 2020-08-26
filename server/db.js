const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bcrypt = require("bcryptjs");

const adapter = new FileSync("db.json");
const db = low(adapter);

const posts = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Vivamus sodales ex a nisl pellentesque laoreet.",
  "Aliquam pellentesque turpis eget purus efficitur venenatis.",
  "Fusce tempus tortor ac odio lacinia, sed auctor dui bibendum.",
  "Nullam fermentum diam non nisi tincidunt, sit amet vulputate sapien dapibus.",
  "Ut interdum magna quis nisi ornare, a imperdiet massa aliquet.",
  "Ut at justo ut ligula luctus aliquam.",
  "Maecenas et eros vitae purus iaculis sollicitudin at vitae tortor.",
  "Quisque aliquet sapien porttitor, luctus leo a, sagittis libero.",
  "In pulvinar erat iaculis, pellentesque dui ut, convallis massa.",
  "Cras ac augue fermentum, elementum mauris sed, feugiat lorem.",
  "Praesent interdum justo imperdiet, varius augue in, mollis mauris.",
];

const responses = [
  "Sed facilisis nibh sed semper pulvinar.",
  "Nulla pretium massa nec velit tincidunt facilisis.",
  "Mauris placerat nisi at tempus porttitor.",
];

const getFeed = () => {
  const feed = [];

  posts.forEach((text, index) => {
    feed.push({
      _id: `${index}`,
      userId: "user-1",
      text,
      publishedAt: new Date().toISOString(),
      parentPostId: null,
    });
  });

  responses.forEach((text, index) => {
    feed.push({
      _id: `r-${index}`,
      userId: "user-2",
      text,
      publishedAt: new Date().toISOString(),
      parentPostId: "0",
    });
  });
  return feed;
};

db.defaults({
  feed: getFeed(),
  users: [
    {
      _id: "user-1",
      avatarUri: "https://picsum.photos/id/237/200",
      name: "Jane Doe",
      username: "jane_doe",
      password: bcrypt.hashSync("password", 10),
    },
    {
      _id: "user-2",
      avatarUri: "https://picsum.photos/id/238/200",
      name: "John Doe",
      username: "john_doe",
      password: bcrypt.hashSync("password", 10),
    },
  ],
  likes: [],
}).write();

module.exports = db;
