require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const post = require("./router/post");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//deploy
const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));

// if (process.env.NODE_ENV == 'production') {
//   url = process.env.MONGO_URI
// }
// else if (process.env.NODE_ENV == 'development') {
//   url = process.env.MONGO_URI
// }

const { NODE_ENV, MONGO_URI } = process.env;
console.log('process.env.NODE_ENV', NODE_ENV, 'MONGO_URI', MONGO_URI)


mongoose.connect(`${MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true,})
        .then(() => console.log('Successfully connected to mongodb'))
        .catch(e => console.error(e));

const db = mongoose.connection;
app.locals.db = db;

app.get("/", (req, res) => {
  res.send("Hello World!!");
});



app.use("/api/post", post)
//const port = process.env.PORT || 8080;
const port = 8080;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});


// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello Beanstalk!!");
// });

// app.listen(port); 