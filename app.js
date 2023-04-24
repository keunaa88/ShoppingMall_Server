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

const { PORT, MONGO_URI } = process.env;

mongoose.connect(`${MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true,})
        .then(() => console.log('Successfully connected to mongodb'))
        .catch(e => console.error(e));

const db = mongoose.connection;
app.locals.db = db;

app.get("/api", (req, res) => {
  res.send("Hello World!!");
});

app.use("/api/post", post)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});