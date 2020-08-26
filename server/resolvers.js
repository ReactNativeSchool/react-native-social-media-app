const shortid = require("shortid");
const db = require("./db");

const resolvers = {
  Post: {
    user: (post) => {
      return db.get("users").find({ _id: post.userId }).value();
    },

    isLiked: (post, args, context) => {
      const currentLikes = db.get(`likes.${context.userId}`, {}).value();
      return currentLikes[post._id] || false;
    },
  },

  Query: {
    feed: () => {
      return db
        .get("feed")
        .filter((o) => o.parentPostId === null || o.parentPostId === undefined)
        .orderBy("publishedAt", "desc")
        .value();
    },

    responses: (parent, args) => {
      const originalPost = db.get("feed").find({ _id: args._id }).value();

      const responses = db
        .get("feed")
        .filter({ parentPostId: args._id })
        .orderBy("publishedAt", "desc")
        .value();

      return [originalPost, ...responses];
    },
  },

  Mutation: {
    createPost: (parent, args, context) => {
      if (!context.userId) {
        throw new Error("Must be a user.");
      }

      const _id = shortid.generate();
      const newPost = {
        _id,
        userId: context.userId,
        text: args.post.text,
        publishedAt: new Date().toISOString(),
        parentPostId: args.post.parentPostId,
      };

      db.get("feed").push(newPost).write();

      return db.get("feed").find({ _id }).value();
    },

    likePost: (parent, args, context) => {
      const key = `likes.${context.userId}`;
      const currentLikes = db.get(key, {}).value();
      const currentLikePost = currentLikes[args.postId] || false;

      db.set(key, {
        ...currentLikes,
        [args.postId]: !currentLikePost,
      }).write();

      return db.get("feed").find({ _id: args.postId }).value();
    },
  },
};

module.exports = resolvers;
