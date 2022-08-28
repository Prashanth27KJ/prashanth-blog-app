const mongoose = require("mongoose");

const connDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      // useCreateIndex: true,
      // useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongoDB connected");
    })
    .catch((error) => {
      console.log({ error: error.message });
    });
};

module.exports = connDB;
