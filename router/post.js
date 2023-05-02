const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const { ObjectId } = require('mongodb');

const {   AWS_ACCESS_KEY_ID, 
          AWS_SECRET_ACCESS_KEY, 
          AWS_REGION,
          AWS_S3_BUCKET_NAME 
      } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
  //signatureVersion: 'v4',
});


const s3 = new AWS.S3();
const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage }).single('file');
router.post('/uploadImg', upload, (req, res) => {
  const file = req.file;
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: Date.now() + '-' + file.originalname,
    Body: file.buffer
  };
  //const { originalname, mimetype, filename, location } = req.file;
  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error uploading file to S3:', err);
    } else {
      console.log('File uploaded to S3:', data);
      const location = data.Location;
      // 파일 정보와 URL을 응답 객체에 담아서 클라이언트에게 보냄
      res.status(200).json({
        message: 'File uploaded successfully',
        file: {
          location
        }
      });
    }
  });
});


router.post('/upload', (req, res) => {
  const data = req.body;
console.log('upload, data', data)

  const db = req.app.locals.db;
  db.collection('Items').insertOne(data, (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.status(200).send({ insertedId: result.insertedId });
  });
  
});
  
router.get('/detail', async (req, res) => {
  const db = req.app.locals.db;
  console.log('detail')
  try {
    const response = await db.collection('Items').find().sort({created:-1}).toArray();
    return res.send(response);
  } catch (err) {
    console.log('get /detail data error: ', err);
    return res.status(500).send({ err: err.message });
  }
});

router.get('/detail/:id', (req, res) => {
  const { id } = req.params;  // 클라이언트로부터 전달된 id 파라미터 추출

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ID' });
  }
  // id에 해당하는 게시물을 데이터베이스에서 조회하여 가져옴
  const db = req.app.locals.db;
  db.collection('Items').findOne({ _id: new ObjectId(id)}, (err, result) => {
    if (err) {
      console.log("데이터 가져오기 error", err)
      res.sendStatus(500);
      return;
    }
    console.log(result)
    res.status(200).send(result);
  });
});



    


//   // 하나의 이미지 파일만 가져온다.
// router.post('/img', multer({ storage }).single('img'), (req, res) => {
//   // 해당 라우터가 정상적으로 작동하면 public/uploads에 이미지가 업로드된다.
//   // 업로드된 이미지의 URL 경로를 프론트엔드로 반환한다.
//   console.log('전달받은 파일', req.file);
//   console.log('저장된 파일의 이름', req.file.filename);

//   // 파일이 저장된 경로를 클라이언트에게 반환해준다.
//   const IMG_URL = `http://localhost:8080/uploads/${req.file.filename}`;
//   console.log(IMG_URL);
//   res.json({ url: IMG_URL });
// });

  module.exports = router;
