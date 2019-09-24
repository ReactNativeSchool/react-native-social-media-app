const shortid = require("shortid");
const db = require("./db");

const resolvers = {
  Status: {
    user: status => {
      return db
        .get("users")
        .find({ _id: status.userId })
        .value();
    }
  },

  Query: {
    example: () => ({ _id: "1", text: "this is an example" }),

    feed: () => {
      return db
        .get("feed")
        .filter(
          o => o.parentStatusId === null || o.parentStatusId === undefined
        )
        .orderBy("publishedAt", "desc")
        .value();
    },

    responses: (parent, args) => {
      const originalStatus = db
        .get("feed")
        .find({ _id: args._id })
        .value();

      const responses = db
        .get("feed")
        .filter({ parentStatusId: args._id })
        .orderBy("publishedAt", "desc")
        .value();

      return [originalStatus, ...responses];
    }
  },

  Mutation: {
    createStatus: (parent, args, context) => {
      if (!context.userId) {
        throw new Error("Must be a user.");
      }

      const _id = shortid.generate();
      const newStatus = {
        _id,
        userId: context.userId,
        status: args.status.text,
        publishedAt: new Date().toISOString(),
        parentStatusId: args.status.parentStatusId
      };

      // console.log(newStatus);
      db.get("feed")
        .push(newStatus)
        .write();

      return db
        .get("feed")
        .find({ _id })
        .value();
    }
  }
};

module.exports = resolvers;
