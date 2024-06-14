const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser'); // npm i cookie-parser

const app = express();
const port = 3000;

// 사용자를 저장할 객체 (예: 메모리 내 사용자 데이터베이스)
const users = {};

// cookie-parser 사용.
app.use(cookieParser());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("서버잘뜸");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// 회원가입 엔드포인트
app.post('/register', async (req, res) => {
  const { userid, password } = req.body;
  if (users[userid]) {
      return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
  }
  
  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);
  users[userid] = { password: hashedPassword };
  res.json({ success: true });

  console.log(users);
});

// 로그인 엔드포인트
app.post('/login', async (req, res) => {
  const { userid, password } = req.body;
  const user = users[userid];
  
  if (!user) {
      return res.json({ success: false, message: '아이디가 존재하지 않습니다.' });
  }
  
  // 비밀번호 검증
  const match = await bcrypt.compare(password, user.password);
  if (match) { res.json({ success: true });
  } else {
      res.json({ success: false, message: '비밀번호가 잘못되었습니다.' });
  }
});

// 쿠키 설정 예시
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'FirstCoding', { maxAge: 60000, httpOnly: true });
  res.send('쿠키가 설정됨.');
});

// 쿠키 읽기 예시
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.send(`저장된 쿠키: ${username}`);
  } else {
    res.send('설정된 쿠키 없음.');
  }
});

// 쿠키 삭제 예시
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('쿠키 삭제 완료.');
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
