const express = require('express');
const router = express.Router();
const posts = require("../model/itemSchema");


router.get("/", function(req, res, next) {
    posts
      .find()
      .then(posts => {
        console.log("Read All 완료");
        res.status(200).json({
          message: "Read All success",
          data: {
            post: posts
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
      });
  });


module.exports = router;
