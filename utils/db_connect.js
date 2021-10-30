const mongoose = require("mongoose");
require("dotenv").config({ path: "./env/.env" });

const PORT = process.env.PORT || 4444;

module.exports = async (app) => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      app.listen(PORT, () => console.log(`Server runs on Port ${PORT}`));
      console.log("DB Connected");
    })
    .catch((err) => console.error(err));
};
