const path = require('path')
const mongoose = require('mongoose');
require('dotenv').config({ path: './env/.env'});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
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
}
