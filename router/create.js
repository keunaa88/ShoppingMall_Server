const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { v4: uuidv4 } = require('uuid');



AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-2',
  //signatureVersion: 'v4',
});




const s3 = new AWS.S3();

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '');
  },
});

const upload = multer({ storage }).single('file');

router.post('/upload', upload, (req, res) => {
  const file = req.file;
  console.log(file)
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error uploading file to S3:', err);
    } else {
      console.log('File uploaded to S3:', data);
    }
  });
  
});



// router.post('/upload', upload.single('file'), (req, res) => {
//   const s3 = new AWS.S3();
//   const file = req.file;
//   console.log('file', file)

//   const params = { 
//     Bucket: 'kmallbucket', 
//     Key: `${Date.now()}.${file.name}`, 
//     Body: file 
//   };
//   const { Location } =  s3.upload(params).promise();
//   //setImageUrl(Location);
//   console.log('uploading to s3', Location);
// });

// router.post('/', (req, res) => {

//     const data = req.body;
//     console.log('data', data)
//     const db = req.app.locals.db;
//     db.collection('Items').insertOne(data, (err, result) => {
//       if (err) {
//         console.error(err);
//         res.sendStatus(500);
//         return;
//       }
  
//       res.sendStatus(200);
//     });
//   });

  module.exports = router;
