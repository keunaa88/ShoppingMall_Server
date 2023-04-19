const express = require('express');
const app = express();
//const path = require('path');
const test = require("./router/test");

app.use("/api", test)

app.listen(8080, function() {
     console.log('listening on 8080')
})

var mongoose = require("mongoose");

const [ MONGO_ID, MONGO_PASSWORD ] = ['admin', 'admin'];
const MONGO_URL = `mongodb+srv://${MONGO_ID}:${MONGO_PASSWORD}@cafeserver.rcbue9y.mongodb.net/Kmall`;

mongoose
  .connect(
    `${MONGO_URL}`,
    {
      // useNewUrlPaser: true,
      // useUnifiedTofology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });
  

//for ajax
// app.use(express.json()); //유저가 보낸 array/object데이터를 출력해보기 위해 필요
// var cors = require('cors'); //cors는 다른 도메인 주소끼리 요청 주고받을때 필요함
// app.use(cors()); // cors libray npm install cors 해야함

//deploy
// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/', function(요청, 응답){
//     응답.sendFile(path.join(__dirname, '../client/build/index.html'))

// })
//dev
// app.use(express.static(path.join(__dirname, '../client/src')));

// app.get('/', function(요청, 응답){
//     응답.sendFile(path.join(__dirname, '../client/src/App.js'))
//  })

//디비디비디비
// html을 서버가 만들면 서버사이드랜더링
//1. db에서 데이터 뽑아서, 2. 글목록.html파일에 꽂아넣고 3. html을 서버에서 보내주는것

// html을 리액트에서 만들면 클라이언트 사이드 랜더링
//1. 리엑트가 서버에 get요청으로 db데이터 가져와서, 2. 그걸 html로만들어서 보여줌(리액트단에서?)
//리액트를 쓰는경우 usually client-side randering 
//아래 참고.
//리액트에서 상품 데이터 필요하면 product 로 get요청
// app.get('/product', function(요청, 응답){
//     응답.json({name : 'balck shoes '}) //디비데이터를 여기다가 넣음 

// })



//라우팅은 서버에서 할 수 도있고, 리액트에서 할 수도 있음.
//리액트 라우터 쓰는 경우, 하단 추가해주는게 좋음
//가장 하단에 둘 것
// app.get('*', function(요청, 응답){
//     응답.sendFile(path.join(__dirname, 'shop/build/index.html'))

// })