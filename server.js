const express = require("express");
const dotenv = require("dotenv"); // module, os가 달라도 동일한 환경변수 사용
dotenv.config();

const app = express();
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const create = require("./router/create");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());


var mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

console.log(MONGO_URL)
mongoose.connect(`${MONGO_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
app.locals.db = db;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('MongoDB connected');
});
  
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/create", create)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});