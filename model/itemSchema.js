var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema(
  {
    mainImg: { type: String, required: true },
    title: { type: String, required: true },
    price:  { type: Number, required: true },
    category: { type: String, required: true },
    content: { type: String },
    created: { type: Date, default: new Date.now() }
  },
  { versionKey: "_somethingElse" }
);
module.exports =  mongoose.model('Item', itemSchema);