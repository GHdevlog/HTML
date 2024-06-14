const express = require('express');
const session = require('express-session'); // npm i express-session

const app = express();
const port = 3000;

// express-session 설정
app.use(session({
  secret: 'your_secret_key', // 세션 암호화에 사용되는 키
  resave: false, // 세션이 수정되지 않아도 다시 저장할지 여부
  saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
  cookie: { maxAge: 60000 } // 쿠키의 유효 기간 설정 (밀리초 단위, 여기서는 1분)
}));

// 세션 설정 예시
app.get('/set-session', (req, res) => {
  req.session.username = 'FirstCoding';
  res.send('세션 설정됨');
});

// 세션 읽기 예시
app.get('/get-session', (req, res) => {
  const username = req.session.username;
  if (username) {
    res.send(`저장된 세션: ${username}`);
  } else {
    res.send('설정된 세션 없음');
  }
});

// 세션 삭제 예시
app.get('/clear-session', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('세션 삭제 오류.');
    }
    res.send('세션 삭제됨.');
  });
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});