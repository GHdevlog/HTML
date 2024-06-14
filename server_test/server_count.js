const express = require('express');

const app = express();

var count = 0;

// 뷰 템플릿 엔진을 EJS로 설정
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('서버 실행중...http://localhost:3000');
});

// 메인 페이지
app.get('/', (req, res) => {
    res.render('count', { count });
});

app.put('/api/count/:cnt', (req, res) => {
    let cnt = req.params.cnt;
    console.log(count, cnt);

    count = Number(cnt);
    res.status(200).json({ count: count });
});
