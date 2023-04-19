var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema(
  {
    title: String,
    price: Number,
    category: String,
    date: { type: Date, default: Date.now }
  },
  { versionKey: "_somethingElse" }
);
module.exports =  mongoose.model('Item', itemSchema);