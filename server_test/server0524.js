const methodOverride = require('method-override')
const express = require('express');
const mysql = require('mysql2')
const app = express();

// 뷰 템플릿 엔진을 EJS로 설정
app.set('view engine', 'ejs');

//html form 사용시 필요
app.use(express.urlencoded({extended: true}));

// form 형식에서 put, delete 사용 가능
app.use(methodOverride('_method'))

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // MySQL 사용자 이름
    port: 4306,
    password: '', // MySQL 비밀번호
    database: 'db_comm' // 사용할 데이터베이스 이름
});

// MySQL 연결
connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

app.listen(3000, ()=>{
    console.log('서버 실행중...http://localhost:3000');
})

//메인 페이지
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

//댓글 페이지 로드
app.get('/comments', (req,res)=>{

    const sql = 'SELECT * FROM comment';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('데이터베이스 오류:', err);
            return res.status(500).send('서버 오류');
        }
        // comments라는 데이터에 {comments: results}를 담아 전송
        res.render('comments', {comments: results})
    });
    
})

//댓글 등록 처리
app.post('/comments', (req,res)=>{
    
    //mysql 연동하기
    const sql = 'INSERT INTO comment(nickname, content) VALUES (?, ?)';
    const values = [req.body.nickname, req.body.comments];

    console.log("post /comment");

    connection.query(sql, values, (err, result) => {
        res.redirect('/comments');
    });
})

//댓글 삭제
app.delete('/api/comments/:id', (req,res)=>{

    const sql = "DELETE FROM comment WHERE number = ?";
    const id = [req.params.id];

    connection.query(sql, [id], (err, results) => {
        if (results.affectedRows == 0){
            res.status(500).json({"result":"FAIL"})
        }

        if (err) {
            console.error('데이터베이스 오류:', err);
            return res.status(500).send('서버 오류');
        }
        
        res.json({"result" : "OK"})
    });
})



//댓글 수정 화면 - GET
app.get('/comments/:id', (req,res)=>{

    
    const sql = 'SELECT * FROM comment WHERE number = ?';
    const id = [req.params.id];
    
    console.log('GET /comments/:', id);

    connection.query(sql, id, (err, results) => {
        console.log("GET /comments/:id 쿼리 실행됨");

        if (err) {
            console.error('데이터베이스 오류:', err);
            return res.status(500).send('서버 오류');
        }
        // edit라는 데이터에 {comments: results}를 담아 전송
        res.render('edit', {comments: results})
    });
    
})


//댓글 수정 API - PUT

app.put('/api/comments/:id',express.json(), (req,res)=>{

    console.log(req.body);

    const id = req.params.id;
    const { nickname, comments } = req.body;

    const sql = "UPDATE comment SET nickname = ?, content = ? WHERE number = ?";

    connection.query(sql, [nickname, comments, id], (error, results) => {
        if (error) {
            console.error('Database update error:', error);
            return res.status(500).send('Database update failed');
        }
        console.log('Update results:', results);
        res.redirect('/comments');
    });
});
