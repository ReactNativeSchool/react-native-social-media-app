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
  }
};

module.exports = resolvers;
