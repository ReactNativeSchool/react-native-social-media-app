const FEED = [
  {
    _id: "1",
    avatarUri: "https://picsum.photos/id/237/200",
    name: "Spencer Carli",
    username: "@spencer_carli",
    status: "This is an example status. Isn't it great?!",
    // mediaUri: 'https://picsum.photos/400',
    isLiked: false,
    publishedAt: "2019-09-12T15:52:01.169Z"
  },
  {
    _id: "2",
    avatarUri: "https://picsum.photos/id/237/200",
    name: "Spencer Carli",
    username: "@spencer_carli",
    status: "This is an example status. Isn't it great?!",
    mediaUri: "https://picsum.photos/400",
    isLiked: true,
    publishedAt: "2019-09-11T15:52:01.169Z"
  },
  {
    _id: "3",
    avatarUri: "https://picsum.photos/id/237/200",
    name: "Spencer Carli",
    username: "@spencer_carli",
    status: "This is an example status. Isn't it great?!",
    mediaUri: "https://picsum.photos/400",
    isLiked: false,
    publishedAt: "2019-09-10T15:52:01.169Z"
  },
  {
    _id: "4",
    avatarUri: "https://picsum.photos/id/237/200",
    name: "Spencer Carli",
    username: "@spencer_carli",
    status: "This is an example status. Isn't it great?!",
    mediaUri: "https://picsum.photos/400",
    isLiked: false,
    publishedAt: "2019-09-09T15:52:01.169Z"
  }
];

const RESPONSES = [
  {
    _id: "t-1",
    parentId: "1",
    avatarUri: "https://picsum.photos/id/238/200",
    name: "John Doe",
    username: "@john_doe",
    status:
      "This is an example response, which is really just a status with a parent. Isn't it great?!",
    isLiked: false,
    publishedAt: "2019-09-12T15:52:01.169Z"
  },
  {
    _id: "t-2",
    parentId: "1",
    avatarUri: "https://picsum.photos/id/239/200",
    name: "John Doe",
    username: "@john_doe",
    status:
      "This is an example response, which is really just a status with a parent. Isn't it great?!",
    isLiked: false,
    publishedAt: "2019-09-12T15:52:01.169Z"
  },
  {
    _id: "t-3",
    parentId: "2",
    avatarUri: "https://picsum.photos/id/240/200",
    name: "John Doe",
    username: "@john_doe",
    status:
      "This is an example response, which is really just a status with a parent. Isn't it great?!",
    isLiked: false,
    publishedAt: "2019-09-12T15:52:01.169Z"
  }
];

module.exports = {
  FEED,
  RESPONSES
};
