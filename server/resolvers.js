const shortid = require("shortid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./db");
const config = require("./config");

const randomNum = (max = 100) => Math.floor(Math.random() * Math.floor(max));

const resolvers = {
  Post: {
    user: (post) => {
      return db.get("users").find({ _id: post.userId }).value();
    },

    isLiked: (post, args, context) => {
      const doc = db
        .get("likes")
        .find({ _id: `${context.userId}_${post._id}` })
        .value();

      if (!doc) {
        return false;
      }

      return doc.liked;
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
      const userId = context.userId;
      const postId = args.postId;

      if (!userId) {
        throw new Error("Must be a user.");
      }

      const _id = `${userId}_${postId}`;
      const docIndex = db.get("likes").findIndex({ _id }).value();

      const likes = db.get("likes").value();
      if (docIndex >= 0) {
        const doc = likes[docIndex];
        likes[docIndex] = {
          ...doc,
          liked: !doc.liked,
        };
      } else {
        likes.push({
          _id,
          liked: true,
        });
      }

      db.set("likes", likes).write();

      return db.get("feed").find({ _id: args.postId }).value();
    },

    login: (parent, args) => {
      const { username, password } = args;

      const user = db.get("users").find({ username }).value();

      if (!user) {
        throw new Error("No user found.");
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password.");
      }

      const token = jwt.sign(
        {
          _id: user._id,
          username: user.username,
        },
        config.JWT_SECRET,
        {
          expiresIn: "30d", // token will expire in 30days
        }
      );

      return {
        user,
        token,
      };
    },

    register: (parent, args) => {
      const { username, password, name } = args.user;

      // Check if user already exists with that email address
      const user = db.get("users").find({ username }).value();
      if (user) {
        throw new Error("User already exists.");
      }

      const newUser = {
        _id: shortid.generate(),
        username,
        password: bcrypt.hashSync(password, 10),
        avatarUri: `https://picsum.photos/id/${randomNum()}/200`,
        name,
      };

      db.get("users").push(newUser).write();

      return newUser;
    },
  },
};

module.exports = resolvers;
