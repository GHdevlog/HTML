const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
// 모든 도메인에서의 CORS 요청을 허용
app.use(cors());

app.listen(port, () => {
    console.log(`서버 실행중: http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/news', (req, res) => {
    console.log(__dirname);
    // mysql db 조회
    res.sendFile(__dirname + '/news.html');
});


// POST 요청을 처리하는 라우트 설정
app.post('/data', (req, res) => {
    const jsonData = req.body;
    console.log(jsonData);
    res.send('JSON 데이터가 성공적으로 수신되었습니다.');
});